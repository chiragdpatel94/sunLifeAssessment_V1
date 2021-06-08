public class creatingAccountRecords {
    public static void createAccount(){
        List<Account> creatingTestAccounts = new List<Account>();
        Integer i;
        for (i = 0 ; i < 10; i++) {
            Account newAccount = new Account(
                Name = 'SunLife Account ' + i,
                Industry = 'Financial Services',
            Phone = '123123120'+i,
            Website = 'https://Random' + i + '.com',
            AnnualRevenue = 1234560 + i );
            creatingTestAccounts.add(newAccount);
        }
        insert creatingTestAccounts;
    }
    public static void deleteAccount(){
        List<Account> deletingTestAccounts = [Select Id from Account where Name LIKE 'SunLife Account%'];
        delete deletingTestAccounts;
    }
    
}