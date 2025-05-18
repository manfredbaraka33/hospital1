import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import axiosService from '../helpers/axios'


const PatientReg = () => {

  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState(null);
  const navigate =useNavigate();
  const [loading,setLoading]=useState(false);

    const [formData,setFormData]=useState({
            first_name:'',
            last_name:'',
            gender:'',
            dob:'',
            contact_number:'',
            hepatitis_b_stage:'',
            region:'',
            comorbidities:'',
            treatment_type:'',
            facility:'Hospital1'
        })

    const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData((prevData) => ({
              ...prevData,
              [name]: value,
            }));
          };

    const handleSubmit=async (e)=>{
           e.preventDefault();
           setLoading(true);
           const data = new FormData();
           Object.keys(formData).forEach((key) => {
               data.append(key, formData[key]);
           });
          console.log("here is the data",data);
          console.log("here is the dformdata",formData);
          try{
            const response = await axiosService.post('/register_patient/', data);
            setSuccess(true);
            alert("Patient registered successfully");
            navigate('/home')
          }
          catch(error){
          console.log(error);
          setErrors(error);
          alert("Patient registration failed")
          }
          finally{
            setLoading(false)
          }
    }

  return (
    <div style={{height:'600px'}} className='container-fluid  text-light' >
        <Navbar />
        <br />
    <div className="container mt-5">
       <> </>
       <form className='mt-3 reg-form p-3 rounded' onSubmit={handleSubmit}>
       <h3>Register a new patient</h3>
            <div className="row my-2">
                <div className="col">
                    <label htmlFor="fname">First name: </label>
                    <input type="text" className='form-control' name='first_name' placeholder='Enter the first name' required value={formData.first_name} onChange={handleChange} />
                </div>
                <div className="col">
                    <label htmlFor="lname">Last name: </label>
                    <input type="text" className='form-control' name='last_name' placeholder='Enter last name' required value={formData.last_name} onChange={handleChange} />
                </div>
            </div>
            <div className="row my-2">
                <div className="col">
                    <label className='' htmlFor="gender">Gender: </label>
                    <br />
                     <span>
                    <input type="radio" className='mx-3' name='gender' value="M"  required  onChange={handleChange} />
                    Male
                    </span>
                        <br />
                    <span>
                    <input type="radio" className='mx-3' name='gender' value="F" required  onChange={handleChange} />
                    Female
                    </span>
                </div>
                <div className="col">
                    <label htmlFor="dob">Date of Birth: </label>
                    <input type='date' className='form-control' name='dob'  required value={formData.dob} onChange={handleChange}/>
                </div>
            </div>
            <div className="row my-2">
                <div className="col">
                <label htmlFor="dob">Contact number: </label>
                    <input type='tel' className='form-control' name='contact_number' placeholder='Eg. 07XXXXXXXX/06xxxxxxxx' maxLength='10'  required value={formData.contact_number} onChange={handleChange} />
                </div>
                <div className="col">
                    <label htmlFor="region">Region: </label>
                    <select name="region" id="region" className='form-control' required value={formData.region} onChange={handleChange}>
                       <option value='' >Click to select region</option>
                       <option value="Arusha">Arusha</option>
                        <option value="Dar es Salaam">Dar es Salaam</option>
                        <option value="Dodoma">Dodoma</option>
                        <option value="Geita">Geita</option>
                        <option value="Iringa">Iringa</option>
                        <option value="Kagera">Kagera</option>
                        <option value="Katavi">Katavi</option>
                        <option value="Kigoma">Kigoma</option>
                        <option value="Kilimanjaro">Kilimanjaro</option>
                        <option value="Lindi">Lindi</option>
                        <option value="Manyara">Manyara</option>
                        <option value="Mara">Mara</option>
                        <option value="Mbeya">Mbeya</option>
                        <option value="Morogoro">Morogoro</option>
                        <option value="Mtwara">Mtwara</option>
                        <option value="Mwanza">Mwanza</option>
                        <option value="Njombe">Njombe</option>
                        <option value="Pwani">Pwani</option>
                        <option value="Rukwa">Rukwa</option>
                        <option value="Ruvuma">Ruvuma</option>
                        <option value="Shinyanga">Shinyanga</option>
                        <option value="Simiyu">Simiyu</option>
                        <option value="Singida">Singida</option>
                        <option value="Tabora">Tabora</option>
                        <option value="Tanga">Tanga</option>
                        <option value="Songwe">Songwe</option>
                        <option value="Zanzibar North">Zanzibar North</option>
                        <option value="Zanzibar Central/South">Zanzibar Central/South</option>
                        <option value="Zanzibar Urban/West">Zanzibar Urban/West</option>
                        <option value="Pemba North">Pemba North</option>
                        <option value="Pemba South">Pemba South</option>
                    </select>
                </div>
            </div>
            <div className="row my-2">
            <div className="col">
                    <label htmlFor="comobid">Comorbidities: </label>
                    <textarea name="comorbidities" id="comobid" rows="6" className='form-control' 
                    placeholder='Enter all comorbidities the patient has (if any)....'
                    value={formData.comorbidities} onChange={handleChange}
                    ></textarea>
                </div>
                <div className="col">
                    <label htmlFor="stage">Hepatitis B stage: </label>
                    <select name="hepatitis_b_stage" id="stage" className='form-control' required value={formData.hepatitis_b_stage} onChange={handleChange}>
                        <option value='' >Click to select stage</option>
                        <option value="acute">Acute</option>
                        <option value="chronic">Chronic</option>
                    </select>
                </div>
                
            </div>
            
            <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? <div className="mt-3 text-center">
                <div className="spinner-grow text-light" role="status"></div>
                <div className="spinner-grow text-danger" role="status"></div>
                <div className="spinner-grow text-success" role="status"></div>
                <div className="spinner-grow text-info" role="status"></div>
                <p>Registering {formData.first_name} ...</p>
            </div> : "Register"}
          </button>


            {errors && (
          <div className="alert alert-danger">
            <div>An error from our side occurred, please contact support team for help.</div>
          </div>
        )}
        

       </form>
    </div>

    </div>
  )
}

export default PatientReg