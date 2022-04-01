import * as yup from 'yup';

const seriaValidator = /^[aA-zZ\s]+$/
const today = new Date();
today.setHours(0, 0, 0, 0)
yup.addMethod(yup.string, "testSerialNumber", function (errorMessage) {
    return this.test(`test-serial-number`, errorMessage, function (value) {
      const { path, createError } = this;
  
      return (
        (value && value.match(/^([0-9a-zA-Z]{5})+([-])+([0-9a-zA-Z]{6})$/)) ||
        createError({ path, message: errorMessage })
      );
    });
  });

export const issueSchema = yup.object().shape({
    name: yup.string().max(40, "Name is too long").required("Name can not be empy"),
    email: yup.string().email("Please enter a valid email").required("Email is required"),
    date: yup.date().min(today, 'Date cannot be in the past').required("Email is required"),
    laptop: yup.string().required("Please select a laptop"),
    issue: yup.string().required("Please specify an issue"),
    notes: yup.string().max(500, "notes are too long, maximum size is 500 characters"),
    serialN: yup.string().testSerialNumber("Serial Number invalid format, format should be (12345-123456)").max(500).required("Serial number can not be empty"),
    picture: yup.mixed().test("type", "Only images (png, jpg and jpeg) can be uploaded", (value) =>{
        return value && (value.type==="image/jpeg" || value.type==="image/jpg" || value.type==="image/png")
    }),

});