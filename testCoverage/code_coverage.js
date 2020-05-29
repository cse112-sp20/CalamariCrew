const fs = require('fs');
const totalThreshhold = 0.5;
const path = 'coverage/coverage-summary.json';
var totalLineCoverage = 0;
try{
    // Reads coverage summary for only total code coverage
    if (!fs.existsSync(path)) {
        console.log('Warning: Code coverage summary not found!');
        return;
    }
    else{
        var reportFile = fs.readFileSync(path);
        var reportData = JSON.parse(reportFile);
        totalLineCoverage = reportData['total']['lines']['covered'] / reportData['total']['lines']['total'];

        for (var file in reportData){
            for(var category in reportData[file]){
                var covered = reportData[file][category]['covered'];
                var total = reportData[file][category]['total'];
                if( (category == 'skipped') || (total == 0)) continue;
                if(covered/total < totalThreshhold) 
                    throw `Test on ${file} failed in ${category} with a CC score of ${covered/total}, expected ${totalThreshhold}`;

            }
            
        }
    }
    
}catch(e){
    console.log('Error:', e);
    throw e;
    
}
console.log(`CC passed with a total score of ${totalLineCoverage}`);