export enum ScheduleStatus {
    PENDING = 1,
    INPROGRESS =2,
    COMPLETED =3,
    REJECTED =4
}

export enum membershipPeriodType {
    MONTHTOMONTH='Month to month',
    YEARTOYEAR = 'year to year',
    DAYTODAY = 'day to day'

}

export enum NicCheck {
    INVALIDSTATUS = 1 , 
}

export enum AlertMessages {
    ERRORMESSAGEFORFORMVALIDATION = 'Something went wrong.form Validated failed!',
    DUPLICATEIDMEMBERSHIP = 'You already requested a membership,Check if it is invalid',
    UPLOADIMAGE = 'Please make sure to upload the image'
}