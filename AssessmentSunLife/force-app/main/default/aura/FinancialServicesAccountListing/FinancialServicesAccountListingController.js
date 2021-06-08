({
    doInit: function(component, event, helper) {
        debugger;
        helper.setColumns(component);
        helper.setData(component);
    },
    
    handleSort : function(component, event, helper) {
        helper.handleSorting(component,event);  
    },
    
    searchAccount : function(component, event, helper) {
        var searchKey = component.get("v.searchKey");
        
        helper.setData(component,searchKey);
    },
    
    handleSave : function(component,event,helper){
        debugger;
        var draftValues = event.getParam('draftValues');
        var savedraft = component.get("c.saveDraftValues");
        savedraft.setParams({draftValues : draftValues });
        savedraft.setCallback(this,function(response){
            var state = response.getState();
            if(state==="SUCCESS"){
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": "Records Updated",
                    "message": "Records have been updated in Salesforce"
                });
                toastEvent.fire();
                $A.get('e.force:refreshView').fire();
            }
            if(state ==="ERROR")
            {
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": "Records Not Updated",
                    "message": "Records have NOT been updated in Salesforce"
                });
                toastEvent.fire();
                $A.get('e.force:refreshView').fire();
            }
        });
        $A.enqueueAction(savedraft); 
    }
})