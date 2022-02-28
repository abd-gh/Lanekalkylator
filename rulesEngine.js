const fs =require('fs');
//const index = require('./index')
/**
 * @param {object} applicationData
 * @param {Array} lenders - An array with lenders and their rules
 * @return {Array} result - The filtered array
 */
function run (applicationData, lenders) {
  
 var result=[];
 
 lenders?.forEach(element => {
      var status = false;
      
       element.rules.forEach(rule=>{
         if(rule.field=='amount' )
         {
           if(rule.operator=='greaterThan' && applicationData.body.amount > rule.value)
           {
             status=true;
           }
          else if(rule.operator=='lessThan' && applicationData.body.amount < rule.value)
           {
            status=true;
           }
         }
         else if(rule.field=='repaymentYears')
         {
          if(rule.operator=='greaterThan' && applicationData.body.repaymentYears> rule.value)
          {
            status=true;
          }
         else if(rule.operator=='lessThan' && applicationData.body.amount < rule.value)
          {
            status=true;
          }
         }
       });
       if(status)
         {
          result.push({name:element.name});
         }
     });
    
     return result;
     
}

module.exports = {
  run
}

