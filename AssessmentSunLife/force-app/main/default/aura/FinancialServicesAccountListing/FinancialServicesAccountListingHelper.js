({
    setColumns : function(component) {
        
        var tableColumns = [
            {
                type: 'url',
                fieldName: 'accountUrl',
                label: 'Account Name',
                sortable:true,
                initialWidth : 150,
                wrapText: true,
                typeAttributes: { label: { fieldName: 'Name' }},
                
            },
            {
                type: 'Text',
                fieldName: 'AccountOwner',
                label: 'Account Owner',
                initialWidth : 150,
                sortable:true,
                wrapText: true,
               
            },
            {
                type: 'Text',
                fieldName: 'Phone',
                label: 'Phone',
                wrapText: true,
                editable : 'true'
            },
            {
                type: 'Text',
                fieldName: 'Website',
                label: 'Website',
                initialWidth : 200,
                wrapText: true,
                editable : 'true'
            },
            {
                type: 'Text',
                fieldName: 'AnnualRevenue',
                label: 'Annual Revenue',
                wrapText: true,
                editable : 'true'
            }
        ];
        component.set("v.tableColumns",tableColumns);
        
    },
    
    setData : function(component,searchKey){
        debugger;
        var getAccounts = component.get("c.getAccountList");
        getAccounts.setParams({searchkey : searchKey});
        getAccounts.setCallback(this,function(response){
            var state = response.getState();
            if(state==="SUCCESS"){
                var accountListApex = response.getReturnValue();
                if(accountListApex.length == 0){
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        "title": "No Records Found",
                        "message": "No Records were found with the given search key"
                    });
                    toastEvent.fire();
                     component.set("v.accountTableData",'');
                }
                else
                {
                    var accountList = [];
                    for(var i in accountListApex){
                        var singleAccount = {
                            "Id" : accountListApex[i].Id,
                            "accountUrl" : 'https://creative-koala-bkc8w0-dev-ed.lightning.force.com/lightning/r/Account/'+accountListApex[i].Id+'/view',
                            "Name" : accountListApex[i].Name,
                            "AccountOwner" : accountListApex[i].Owner.Name,
                            "Phone" : accountListApex[i].Phone,
                            "Website" : accountListApex[i].Website,
                            "AnnualRevenue" : accountListApex[i].AnnualRevenue
                        };
                        accountList.push(singleAccount);
                    }
                    component.set("v.accountTableData",accountList);
                }
            }
            
            if(state==="ERROR"){
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": "ERROR",
                    "message": "There was an error retreiving Account List"
                });
                toastEvent.fire();
            }
        });
        $A.enqueueAction(getAccounts); 
    },
    
    handleSorting: function(component, event) {
        debugger;
        var sortedBy = event.getParam('fieldName');
        var sortDirection = event.getParam('sortDirection');
        var accountTableData = component.get('v.accountTableData');
        var cloneData = accountTableData;
        cloneData.sort((this.sortBy(sortedBy, sortDirection === 'asc' ? 1 : -1)));
        
        component.set('v.accountTableData', cloneData);
        component.set('v.sortDirection', sortDirection);
        component.set('v.sortedBy', sortedBy);
    },
    
    sortBy: function(field, reverse, primer) {
        var key = primer
        ? function(x) {
            return primer(x[field]);
        }
        : function(x) {
            return x[field];
        };
        
        return function(a, b) {
            a = key(a);
            b = key(b);
            return reverse * ((a > b) - (b > a));
        };
    },
    
})