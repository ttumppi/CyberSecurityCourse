### Missing delete functions
#### Problem
None of the reservations or resources can be deleted by users which means that the database will swell up in time. 
#### Fix
Add deletion functionality to the resources and reservations. The reservations could have a time slot for which they are reserved for, and upon time slot expiration, release the reservation.
Users could also remove their own reservations and administrators could remove resources. Although the database should probably be modified to also remove all the reservations on the removal of a resource.

### Administrator registration not moderated
#### Problem
Essentially anybody can register as administrator so the different user levels do not make sense, as they do not actually protect any actions.
#### Fix
One fix to this problem would be that only an existing administrator could create more administrator accounts.

### No DDOS protection
#### Problem
If someone were to create big amount of traffic to the website, the website would handle all of the requests in normal way, which could significantly slow down the website
or make it unusable.
#### Fix
Adding a check for request per second or specific time slot for one client could potentially fix the problem. The request would be disregarded as fast as possible to lighten the load.

### No password masking in input field
#### Problem
The website does not cover input typed into the password fields, which exposes user to bystanders checking what password is inputted to the field.
#### Fix
Make the password input fields use type **password** instead of **text**

### No log deletion
#### Problem
None of the logs are being deleted periodically, which means that every login information is saved for as long as the database stays intact.
#### Fix
Make a background thread that will periodically check logs timestamps and remove ones that are older than a set amount of time.
