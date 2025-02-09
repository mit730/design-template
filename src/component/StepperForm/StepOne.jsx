import { Field, FieldArray } from 'formik'
import React from 'react'

const StepOne = ({ values, setFieldValue }) => {
    return (
        <>
            <div>StepOne</div>

            <div >
                <label>Email </label>
                <input
                    type='text'
                    placeholder='email'
                    value={values.email}
                    onChange={(e) => setFieldValue("email", e.target.value)}
                />
            </div>

            <div >
                <label>Name </label>
                <input
                    type='text'
                    placeholder='name'
                    value={values.name}
                    onChange={(e) => setFieldValue("name", e.target.value)}
                />
            </div>

            <div >
                <FieldArray name='food' >
                    {({push, remove }) => (
                        <div style={{ border: "2px solid", marginTop : "20px", padding: "10px", width: "100%" }}>
                            {values.food.length && values.food.map((item, i) => (
                                <div key={i}>
                                        <button type='button' onClick={() => push({lunch : "", dinner : ""})}>+</button>
                                     { i > 0 &&  <button type='button' onClick={() => remove(i)}>-</button>}
                                    <div>
                                        <label>Lunch</label>
                                        <Field type='text' name={`food.${i}.lunch`} placeholder='lunch' />
                                    </div>
                                    <div>
                                        <label>Dinner</label>
                                        <Field type='text' name={`food.${i}.dinner`} placeholder='dinner' />
                                    </div>
                                </div>
                            ))}

                        
                        </div>
                    )}
                </FieldArray>
            </div>
        </>
    )
}

export default StepOne