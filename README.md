# FE22-js2-slutprojekt-oskar-kubicka

Uppgiftsbeskrivning:

Du ska skapa en enkel social media sida med hjälp av firebase. Sidan ska innehålla flera användare och deras profilsidor. 

På sidan ska man kunna logga in som en existerande användare eller skapa en ny användare. Som inloggad ska man kunna skriva statusuppdateringar på sin egna profilsida samt besöka andras profiler. Man ska även kunna radera sitt egna konto. 

Krav

Man ska kunna logga in med ett användarnamn och tillhörande lösenord som kollas mot firebase-databasen. (OBS det här kommer inte vara säkert)

Man ska kunna skapa en ny användare. Varje användare behöver innehålla minst följande.
-Användarnamn
-Lösenord
-Bild - Välj mellan minst tre default-bilder

Inloggad Användare
Som inloggad ska det synas vilken användare man är inloggad som. 
Man ska även kunna
-Se sina egna statusuppdateringar
-Lägga till nya statusuppdateringar
-Besöka andra användares sidor
-Radera sitt egna konto

Besöka Användare
Det ska finnas en lista på alla användare. 
Varje användare ska vara klickbar så att man kan besöka dess sida. 
På varje Användares sida ska man minst kunna se
-Användarnamn
-Bild
-De senaste Statusuppdateringarna

Firebase
Använd firebase för att hålla reda på alla användarnamn, deras lösenord och statusuppdateringar.
Du bestämmer själv hur du strukturerar databasen.
Du väljer själv om du vill använda firebase-biblioteket eller REST (med fetch)

Koden och Utvecklingsmiljön
Under utvecklingen ska du använda
TypeScript
Parcel 
