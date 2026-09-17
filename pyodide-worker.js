importScripts('https://cdn.jsdelivr.net/pyodide/v0.26.2/full/pyodide.js');
let pyodide;
async function load(){ if(!pyodide){ pyodide=await loadPyodide(); } return pyodide; }
self.onmessage=async(event)=>{
  const {id, mode, code, functionName, tests}=event.data;
  try{
    const py=await load();
    if(mode==='run'){
      py.setStdout({batched:(text)=>self.postMessage({id,ok:true,output:text})});
      py.setStderr({batched:(text)=>self.postMessage({id,ok:false,error:text})});
      await py.runPythonAsync(code);
      self.postMessage({id,done:true,ok:true});
      return;
    }
    const testsJson=JSON.stringify(tests).replace(/\\/g,'\\\\').replace(/'/g,"\\'");
    const harness=`\nimport json\n__tests=json.loads('${testsJson}')\n__results=[]\nfor __case in __tests:\n    try:\n        __results.append(${functionName}(*__case['args']))\n    except Exception as __err:\n        __results.append({'__error__':str(__err)})\njson.dumps(__results)\n`;
    const result=await py.runPythonAsync(code+harness);
    const actual=JSON.parse(result);
    const passed=actual.reduce((total,value,index)=>total+(JSON.stringify(value)===JSON.stringify(tests[index].expected)?1:0),0);
    self.postMessage({id,done:true,ok:passed===tests.length,passed,total:tests.length,message:passed===tests.length?'All tests passed.':`You passed ${passed} of ${tests.length} tests. Check edge cases and try again.`});
  }catch(error){self.postMessage({id,done:true,ok:false,error:String(error)});}
};
