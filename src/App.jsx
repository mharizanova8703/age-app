import { useState } from "react";
import "./App.css";

function App() {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [age, setAge] = useState(null);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    const today = new Date();
    const inputDate = new Date(`${year}-${month}-${day}`);

    if (!day) errors.day = "Day is required.";
    if (!month) errors.month = "Month is required.";
    if (!year) errors.year = "Year is required.";

    if (day < 1 || day > 31) errors.day = "Day must be between 1 and 31.";
    if (month < 1 || month > 12) errors.month = "Month must be between 1 and 12.";
    if (inputDate > today) errors.date = "Date cannot be in the future.";

    const daysInMonth = new Date(year, month, 0).getDate();
    if (day > daysInMonth) errors.date = `Invalid date. ${month}/${year} only has ${daysInMonth} days.`;

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const calculateAge = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const today = new Date();
      const birthDate = new Date(`${year}-${month}-${day}`);
      let ageYears = today.getFullYear() - birthDate.getFullYear();
      let ageMonths = today.getMonth() - birthDate.getMonth();
      let ageDays = today.getDate() - birthDate.getDate();

      if (ageDays < 0) {
        ageMonths -= 1;
        ageDays += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
      }

      if (ageMonths < 0) {
        ageYears -= 1;
        ageMonths += 12;
      }

      setAge({ years: ageYears, months: ageMonths, days: ageDays });
    }
  };

  return (
    <>
      <div className="container">
        <form className="form" onSubmit={calculateAge}>
          <div className="d-flex  align-items-center">
          <div className="d-flex flex-column col-lg-4 mx-2">
            <label htmlFor="day" className="text-start">DAY</label>
            <input
              type="text"
              className="form-control"
              id="day"
              value={day}
              onChange={(e) => setDay(e.target.value)}
              className={errors.day ? "form-control is-invalid" : "form-control"}
            />
            {errors.day && <div className="invalid-feedback">{errors.day}</div>}
          </div>
          <div className="d-flex flex-column col-lg-4 mx-2">
            <label htmlFor="month" className="text-start">MONTH</label>
            <input
              type="text"
              className="form-control"
              id="month"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className={errors.month ? "form-control is-invalid" : "form-control"}
            />
            {errors.month && <div className="invalid-feedback">{errors.month}</div>}
          </div>
          <div className="d-flex flex-column col-lg-4 mx-2">
            <label htmlFor="year" className="text-start">YEAR</label>
            <input
              type="text"
              className="form-control"
              id="year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className={errors.year ? "form-control is-invalid" : "form-control"}
            />
            {errors.year && <div className="invalid-feedback">{errors.year}</div>}
          </div>
          {errors.date && <div className="text-danger">{errors.date}</div>}
         
          </div>
          <div className="mt-3">
            <button type="submit" className="btn"><img className="w-100" src="./src/assets/button-un-active.png" alt="active-btn"/></button>
     
          </div>
        </form>
        {age && (
          <div className="mt-3">
            <h3>Age:</h3>
            <p>{age.years} Years, {age.months} Months, and {age.days} Days</p>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
