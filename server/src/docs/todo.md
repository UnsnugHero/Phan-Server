# To Do

- Make a catch all for route error handling with fields and stuff. Might be able to add a validator middleware that will attach to the main level route that will map a route name after the `/api` segment to a validation function so that it can validate correctly but handle throwing the errors for every route that has that.

- the duplicate username validator may not be working (i think I was trying to check without the validator middleware applied)
