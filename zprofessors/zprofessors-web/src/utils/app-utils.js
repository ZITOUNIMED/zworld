var zconfig = require('../../config/z-config.json');

function toObject(item){
    if(item.command.indexOf('.') < 0){
        return {
            [item['command']]: item['value']
        }
    }
    let obj = undefined;
    let psub = undefined;
    let splits = item.command.split('.');
    for(let i = 0; i<splits.length; i++){
        let spt = splits[i]
        let sub = {[spt]: {}};
        if(!obj){
            obj = sub
        } else {
            if((i+1) == splits.length){
                psub[spt]=item['value']
            } else {
                psub[spt]={}
            }
        }
        if(psub){
            psub = psub[spt];
        } else {
            psub = sub[spt];
        }
        
    }
        
    return obj;
}

function isObject(item) {
    return (item && typeof item === 'object' && !Array.isArray(item));
  }

function mergeDeep(target, ...sources) {
    if (!sources.length) return target;
    const source = sources.shift();
  
    if (isObject(target) && isObject(source)) {
      for (const key in source) {
        if (isObject(source[key])) {
          if (!target[key]) Object.assign(target, { [key]: {} });
          mergeDeep(target[key], source[key]);
        } else {
          Object.assign(target, { [key]: source[key] });
        }
      }
    }
  
    return mergeDeep(target, ...sources);
  }
    

function processArgs(){
    let pconfig = {};
    if(process && process.argv){
        let items = process.argv.filter(arg => arg.length>3 && arg.indexOf('=')>-1)
                                .map(arg => {
                                    let splits = arg.split('=')
                                    return toObject({
                                        command: splits[0],
                                        value: splits[1]
                                    });
                                });
        obj = {}
        items.forEach(function(item){
            obj = mergeDeep(obj, item)
        })
        
       pconfig = obj;
    }

    return pconfig;
}

let argconfig = processArgs();


let config = {
    "server": {
        "port": "4300"
    },
    "greetings":{
        "msg": "Hello from default!"
    },
    "api": {
        "host": "localhost",
        "port": 3100
    }
}

if(zconfig){
    config = mergeDeep(config, zconfig)
}

if(argconfig){
    config = mergeDeep(config, argconfig)
}

module.exports = {uconfig: config}