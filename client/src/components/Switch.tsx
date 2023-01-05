import React from 'react'
import Light from '../assets/Light';
import Dark from '../assets/Dark';

type Switch = {
    isOn: boolean,
    handleSwitch: () => void
}

const Switch = ({ isOn, handleSwitch }: Switch) => {
    return (
        <div className='flex items-center'>
            <Light
                mode={isOn}
            />
            <div className='flex ml-1 mr-2.5'>
                <input
                    checked={isOn}
                    onChange={handleSwitch}
                    className="react-switch-checkbox"
                    id={`react-switch-new`}
                    type="checkbox"
                />
                <label
                    className="react-switch-label"
                    htmlFor={`react-switch-new`}
                >
                    <span className={`react-switch-button`} />
                </label>
            </div>

            <Dark
                mode={isOn}
            />
        </div>
    );
};

export default Switch