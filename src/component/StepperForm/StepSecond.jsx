import React from 'react'

const StepSecond = ({ values, setFieldValue }) => {
    return (
        <>
            <div>StepSecond</div>

            <div >
                <label>Age </label>
                <input
                    type='text'
                    placeholder='age'
                    value={values.age}
                    onChange={(e) => setFieldValue("age", e.target.value)}
                />
            </div>

            <div >
                <label>language </label>
                <input
                    type='text'
                    placeholder='language'
                    value={values.language}
                    onChange={(e) => setFieldValue("language", e.target.value)}
                />
            </div>
        </>
    )
}

export default StepSecond