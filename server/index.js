const fs = require('fs')
const express = require('express')
const PythonShell = require('python-shell').PythonShell
const cors = require('cors');
const app = express()
const port = 80

app.use(cors());
app.use(express.json());


app.post('/python', (req, res) => {
    fs.writeFileSync('test.py', req.body.code);
    
    let options = {
        mode: 'text',
        pythonOptions: ['-u'], // get print results in real-time
        args: [1, 2, 3]
      };
      
      PythonShell.run('test.py', options, function (err, results) {
        if (err) throw err;
        // results is an array consisting of messages collected during execution
        console.log('results: %j', results);
        res.json({ passOrFail: results[0]});
      });

    
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

/*
import sys;

def add(a,b):
    return a+b

if __name__ == "__main__":
    a = int(sys.argv[1]);
    b = int(sys.argv[2]);
    result = int(sys.argv[3])
    print(add(a,b) == result)
*/