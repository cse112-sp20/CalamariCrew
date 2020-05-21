const fs = require('fs');
const totalThreshhold = 2;
try{
    // Reads coverage summary for only total code coverage
    var reportFile = fs.readFileSync('coverage/coverage-summary.json');
    var reportData = JSON.parse(reportFile);
    var totalLineCoverage = reportData['total']['lines']['covered'] / reportData['total']['lines']['total'];
    var totalStatementCoverage = reportData['total']['statements']['covered'] / reportData['total']['statements']['total'];
    var totalFunctionCoverage = reportData['total']['functions']['covered'] / reportData['total']['functions']['total'];
    var totalBranchCoverage = reportData['total']['branches']['covered'] / reportData['total']['branches']['total'];
    var totalTesting = []
    totalTesting.push(totalLineCoverage);
    totalTesting.push(totalStatementCoverage);
    totalTesting.push(totalFunctionCoverage);
    totalTesting.push(totalBranchCoverage);

    for (var file in reportData){
        for(var category in reportData[file]){
            var covered = reportData[file][category]['covered'];
            var total = reportData[file][category]['total'];
            if( (category == 'skipped') || (total == 0)) continue;
            if(covered/total < totalThreshhold) throw `Test on ${file} failed in ${category} with a CC score of ${covered/total}, expected ${totalThreshhold}`;
        }
        
    }
    
}catch(e){
    console.log('Error:', e);
}