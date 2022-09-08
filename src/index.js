import React from "react";
import ReactDOM from "react-dom";
import { Formik, Form, Field, FieldArray } from "formik";

import "./styles.css";

const Colors = ({ friend, name }) => (
  <FieldArray
    name={name}
    render={arrayHelpers => (
      <div style={{ marginTop: "8px", backgroundColor: "rgba(0,0,0,0.1" }}>
        <button
          type="button"
          onClick={() => {
            arrayHelpers.move(0, 1);
          }}
        >
          Move Colors
        </button>
        {friend.likedColors.length ? (
          friend.likedColors.map((color, index) => (
            <div key={index}>
              <Field name={`${name}.${index}`} />
              <button
                type="button"
                onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
              >
                remove Color
              </button>
              <button
                type="button"
                onClick={() => arrayHelpers.insert(index, "")} // insert an empty string at a position
              >
                Add Color
              </button>
            </div>
          ))
        ) : (
          <button type="button" onClick={() => arrayHelpers.push("")}>
            {/* show this when user has removed all friends from the list */}
            Add a color
          </button>
        )}
      </div>
    )}
  />
);

const Basic = () => (
  <div>
    <h1>Anywhere in your app!</h1>
    <Formik
      initialValues={{
        email: "",
        password: "",
        friends: [
          { name: "Russell", isActive: true, likedColors: ["blue", "red"] },
          { name: "Seth", isActive: true, likedColors: ["yellow"] }
        ]
      }}
      validate={values => {
        let errors = {};
        if (!values.email) {
          errors.email = "Required";
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = "Invalid email address";
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting
        /* and other goodies */
      }) => {
        return (
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
            {errors.email && touched.email && errors.email}
            <input
              type="password"
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
            <FieldArray
              name="friends"
              render={arrayHelpers => (
                <div>
                  <button
                    type="button"
                    onClick={() => {
                      arrayHelpers.move(0, 3);
                    }}
                  >
                    Move
                  </button>
                  {values.friends && values.friends.length > 0 ? (
                    values.friends.map(
                      (friend, index) =>
                        !friend.isActive ? null : (
                          <div key={index} style={{ marginTop: "24px" }}>
                            <Field name={`friends.${index}.name`} />
                            <button
                              type="button"
                              onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                            >
                              -
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                arrayHelpers.insert(index, {
                                  name: "",
                                  isActive: true,
                                  likedColors: []
                                })
                              } // insert an empty string at a position
                            >
                              +
                            </button>
                            <Colors
                              name={`friends.${index}.likedColors`}
                              friend={friend}
                            />
                          </div>
                        )
                    )
                  ) : (
                    <button
                      type="button"
                      onClick={() =>
                        arrayHelpers.push({
                          name: "",
                          isActive: true,
                          likedColors: []
                        })
                      }
                    >
                      {/* show this when user has removed all friends from the list */}
                      Add a friend
                    </button>
                  )}
                  <div>
                    <button type="submit">Submit</button>
                  </div>
                </div>
              )}
            />
          </form>
        );
      }}
    </Formik>
  </div>
);

function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <Basic />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
