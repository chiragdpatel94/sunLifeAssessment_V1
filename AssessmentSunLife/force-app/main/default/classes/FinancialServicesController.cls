public class FinancialServicesController {
    
    @AuraEnabled
    public static List<Account> getAccountList(String searchkey){
        List<Account> accountList = new List<Account>();
        
        System.debug('Search Key ' + searchkey);
        if(searchkey != null)
        {
            searchkey = searchkey + '%';
            accountList = [Select Id, Name, Owner.Name,  Phone, Website, AnnualRevenue from Account Where Industry = 'Financial Services' AND Name LIKE :searchkey ];
        }
        else
        {
            accountList = [Select Id, Name, Owner.Name,  Phone, Website, AnnualRevenue from Account Where Industry = 'Financial Services'];
        }
        return accountList;
    }
    
     @AuraEnabled
    public static void saveDraftValues(List<Account> draftValues){
        
        /*
        List<String> accountIDs = new List<String>();
        for(sObject singleEditedRow : draftValues){
            accountIDs.add(singleEditedRow.Id);
        }
        
        List<Account> accountList = [SELECT Id, Name, Owner.Name,  Phone, Website, AnnualRevenue, 
                                     UserRecordAccess.HasEditAccess 
                                     FROM Account where Id in :accountIDs];
        List<Account> newUpdateToAccount = new List<Account>();
        List<String> accountNamesNotToUpdate = new List<String>();
        for(Account singleAccount : accountList)
        {
            if(singleAccount.UserRecordAccess.HasEditAccess == true)
            {
                newUpdateToAccount.add(singleAccount);
            }
            else
            {
                accountNamesNotToUpdate.add(singleAccount.Name);
            }
                
        }
       
        update newUpdateToAccount;
        */
        
        update draftValues;
        
    }
}