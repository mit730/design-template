import React from 'react'

const StepThird = ({ values, setFieldValue }) => {
    return (
        <>
            <div>StepThird</div>

            <div >
                <label>Habit </label>
                <input
                    type='text'
                    placeholder='habit'
                    value={values.habit}
                    onChange={(e) => setFieldValue("habit", e.target.value)}
                />
            </div>

            <div >
                <label>fav </label>
                <input
                    type='text'
                    placeholder='fav'
                    value={values.fav}
                    onChange={(e) => setFieldValue("fav", e.target.value)}
                />
            </div>
        </>
    )
}

export default StepThird