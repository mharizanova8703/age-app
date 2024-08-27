import { useState } from "react";
import "./App.css";
import './assets/sass/main.scss';

function App() {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [age, setAge] = useState({ years: "--", months: "--", days: "--" });
  const [errors, setErrors] = useState({});
  const [isActive, setIsActive] = useState(false); // New state to track active button

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

  const calculateAge = () => {
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

  const handleButtonClick = () => {
    setIsActive(true); // Set active button state to true when clicked
    calculateAge(); // Calculate the age immediately
  };

  return (
    <>
      <div id="containerMain" className="container">
        <form className="form" onSubmit={(e) => e.preventDefault()}>
          <div className="d-flex align-items-center">
            <div className="d-flex flex-column col-lg-3 mx-2">
              <label htmlFor="day" className="text-start poppins-bold">DAY</label>
              <input
                type="text"
                className={errors.day ? "form-control is-invalid" : "form-control"}
                id="day"
                placeholder="DD"
                value={day}
                onChange={(e) => setDay(e.target.value)}
              />
              {errors.day && <div className="invalid-feedback">{errors.day}</div>}
            </div>
            <div className="d-flex flex-column col-lg-3 mx-2">
              <label htmlFor="month" className="text-start poppins-bold">MONTH</label>
              <input
                type="text"
                className={errors.month ? "form-control is-invalid" : "form-control"}
                id="month"
                placeholder="MM"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
              />
              {errors.month && <div className="invalid-feedback">{errors.month}</div>}
            </div>
            <div className="d-flex flex-column col-lg-3 mx-2">
              <label htmlFor="year" className="text-start poppins-bold">YEAR</label>
              <input
                type="text"
                className={errors.year ? "form-control is-invalid" : "form-control"}
                id="year"
                placeholder="YYYY"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              />
              {errors.year && <div className="invalid-feedback">{errors.year}</div>}
            </div>
            {errors.date && <div className="text-danger">{errors.date}</div>}
          </div>
          <div className="mt-3">
            {!isActive && (
              <button type="button" className="btn-unactive" onClick={handleButtonClick}>
                <img className="w-100" src="./src/assets/button-un-active.png" alt="un-active-btn" />
              </button>
            )}
            {isActive && (
              <button type="submit" className="btn-active">
                <img className="w-100" src="./src/assets/active-button.png" alt="active-btn" />
              </button>
            )}
          </div>
        </form>
        <div className="age-container font-xl">
          <p><span className="number-age">{age.years}</span> years</p>
          <p><span className="number-age">{age.months}</span> months</p>
          <p><span className="number-age">{age.days}</span> days</p>
        </div>
      </div>
    </>
  );
}

export default App;
