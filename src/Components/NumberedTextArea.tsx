import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import "./NumberText.css";
import {
  validation,
  removeDuplicates,
  combinedDuplicates,
} from "../helper/helper";
import Error from "./Error";
import {
  Duplicate,
  keep_the_first_one,
  combine_balance,
  next,
  example,
  delimeter,
  Address,
  upload_file,
  submit,
  keepfirstone,
  combine,
} from "../helper/constant";

interface NumberedTextAreaProps {}

function NumberedTextArea() {
  //*************************************************************/
  // states management for the textarea and numbers//
  //*************************************************************/

 

  const [input, setInput] = useState<any>("");
  const [index, setIndex] = useState(1);
  const [errors, setErrors] = useState<string[]>([]);
  const [sideNumber, setSideNUmber] = useState<number[]>([1]);
  const [isDuplicate, setIsDuplicate] = useState<boolean>(false);
 
  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const split = e.target.value.split("\n");
    setIndex(split.length);
    setInput(split.join("\n"));
  };

  const switchCaseFunc = (str: string) => {
    let splittedArr: string[];

    switch (str) {
      case submit:
        splittedArr = input.split("\n");
        const errorMessages = validation(splittedArr);
        setErrors(errorMessages);
        break;

      case keepfirstone:
        splittedArr = input.split("\n");
        const keepFirstOne = removeDuplicates(splittedArr);
        setInput(keepFirstOne.join("\n"));
        const errorMessages1 = validation(keepFirstOne);
        setErrors(errorMessages1);
        break;

      case combine:
        splittedArr = input.split("\n");
        const combinedDuplicatesArr = combinedDuplicates(splittedArr);
        setInput(combinedDuplicatesArr.join("\n"));
        const errorMessages2 = validation(combinedDuplicatesArr);
        setErrors(errorMessages2);
        break;

      default:
        // Handle other cases if needed
        break;
    }
  };

  // Function to find strings containing the word "duplicate"
  function hasDuplicateWord(arr: string[]) {
    let hasDuplicate = false;

    function searchForDuplicate(arr: (string | string[])[]) {
      for (const item of arr) {
        if (typeof item === "string" && !item.includes("duplicate")) {
          return false;
        }
        if (Array.isArray(item)) {
          if (!searchForDuplicate(item)) {
            return false;
          }
        }
        if (typeof item === "string" && item.includes("duplicate")) {
          hasDuplicate = true;
        }
      }
      return true;
    }

    if (!searchForDuplicate(arr)) {
      return false;
    }

    return hasDuplicate;
  }

  useEffect(() => {
    const newInput = input.split("\n");

    const numbers = Array.from(
      { length: newInput?.length },
      (_, index) => index + 1
    );
    setSideNUmber(numbers);

    const hasAllDuplicates = hasDuplicateWord(errors);

    if (hasAllDuplicates) {
      setIsDuplicate(true);
    } else {
      setIsDuplicate(false);
    }
  }, [input, errors]);

 

  return (
    // <div className="container">
    //   <div className="innercontainer">
    //     <div className="texttop">
    //       <div>
    //         <h4>{Address}</h4>
    //       </div>
    //       <div>
    //         <h4>{upload_file}</h4>
    //       </div>
    //     </div>

    //     <div className="TextBox">
    //       <div className="leftBox">
    //         {sideNumber.map((num) => {
    //           return <div className="num1">{num}</div>;
    //         })}
    //       </div>
    //       <div className="rightbox">
    //         <textarea
    //           className="textcontainer"
    //           value={input}
    //           onChange={(e) => handleInput(e)}
    //         />
    //       </div>
    //     </div>

    //     <div className="textbottom">
    //       <div>
    //         <h4>{delimeter}</h4>
    //       </div>
    //       <div>
    //         <h4>{example}</h4>
    //       </div>
    //     </div>

    //     {isDuplicate ? (
    //       <div className="isDuplicate">
    //         <div className="extratext">
    //           <h4>{Duplicate}</h4>
    //         </div>
    //         <div className="nextbuttons">
    //           <div>
    //             <Button
    //               className="btn_1"
    //               onClick={() => switchCaseFunc(keepfirstone)}
    //             >
    //               {keep_the_first_one}
    //             </Button>
    //           </div>
    //           <div className="btn_slash">|</div>
    //           <div>
    //             <Button
    //               className="btn_1"
    //               onClick={() => switchCaseFunc(combine)}
    //             >
    //               {combine_balance}
    //             </Button>
    //           </div>
    //         </div>
    //       </div>
    //     ) : null}
    //     <div>
    //       {errors.map((error, index) => (
    //         <Error key={index} message={error} /> // Render each error message
    //       ))}
    //     </div>

    //     <Button disabled={input.length > 0 ? false : true} className="btn" onClick={() => switchCaseFunc(submit)}>
    //       <span>{next}</span>
    //     </Button>
    //   </div>
    // </div>
    <div className="container">
    <div className="innercontainer">
      <div className="texttop">
        <div>
          <h4>{Address}</h4>
        </div>
        <div>
          <h4>{upload_file}</h4>
        </div>
      </div>

      <div className="TextBox">
        <div className="leftBox">
          {sideNumber.map((num) => {
            return <div className="num1" key={num}>{num}</div>;
          })}
        </div>
        <div className="rightbox">
          <textarea
            className="textcontainer"
            value={input}
            onChange={(e) => handleInput(e)}
          />
        </div>
      </div>

      <div className="textbottom">
        <div>
          <h4>{delimeter}</h4>
        </div>
        <div>
          <h4>{example}</h4>
        </div>
      </div>

      {isDuplicate ? (
        <div className="isDuplicate">
          <div className="extratext">
            <h4>{Duplicate}</h4>
          </div>
          <div className="nextbuttons">
            <div>
              <button className="btn_1" onClick={() => switchCaseFunc(keepfirstone)}>
                {keep_the_first_one}
              </button>
            </div>
            <div className="btn_slash">|</div>
            <div>
              <button className="btn_1" onClick={() => switchCaseFunc(combine)}>
                {combine_balance}
              </button>
            </div>
          </div>
        </div>
      ) : null}
      <div>
        {errors.map((error, index) => (
          <Error key={index} message={error} /> // Render each error message
        ))}
      </div>

      <button
        disabled={input.length > 0 ? false : true}
        className="btn"
        onClick={() => switchCaseFunc(submit)}
      >
        <span>{next}</span>
      </button>
    </div>
  </div>
  );
}

export default NumberedTextArea;
