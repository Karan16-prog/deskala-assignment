import {candidateType} from './types'

// Email Validation
export function validEmail(email:any):boolean {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

// Phone Number validation
export const validatePhoneNumber = (phoneNo:any):boolean => {
    if(phoneNo.toString().length !==10) return false
    return true
};

// Password validation
export const validatePassword = (password:any):boolean => {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return re.test(password)
};

// Date from 'YYYY-MM-DD' to 'DD/MM/YYYY'
export const formatDate = (input:string):string => {
  const datePart:any = input.match(/\d+/g);
  const year = datePart[0]; // get only two digits
  const month = datePart[1], day = datePart[2];
  return day+'/'+month+'/'+year;
};

// Date from 'DD/MM/YYY' to 'YYYY-MM-DD'
export const formatDateYYYYMMDD = (input:any):string => {
  const datePart:any = input.match(/\d+/g);
  const year = datePart[2]; // get only two digits
  const month = datePart[1], day = datePart[0];
  return year+'-'+month+'-'+day;
}

// Validation for each candidate in the add new candidate form
export const findFormErrors = (props:candidateType) => {
    const { name, dob, email, result, age, state, pincode } = props;
    const newErrors: any = {};
    
    if (!name || name === "") newErrors.name = "Cannot be empty!";
    else if (name.length > 30) newErrors.name = "name is too long!";

    if (!dob || dob === "") newErrors.dob = "Cannot be empty";

    if (!email || email === "") newErrors.email = "Cannot be empty";
    else if (!validEmail(email)) newErrors.email = "Invalid Email";

    if (!age || age === "" || age === null) newErrors.age = "Cannot be empty";

    if (!state || state === "") newErrors.state = "Cannot be empty";

    if (!pincode || pincode === "") newErrors.pincode = "Cannot be empty";
    else if (pincode.length !== 6)
      newErrors.pincode = "Invalid Pincode";
      
    return newErrors;
  };