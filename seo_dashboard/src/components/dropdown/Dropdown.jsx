import * as React from 'react';
import './style.css';

const DropDown = ({ trigger, menu}) => {
    const [open, setOpen] = React.useState(false);

    

    return (
        <div className='dropdown'>
            <button type='button' onClick={() => setOpen(!open)}>
                {trigger}
            </button>
            {/* ? if open true... : if false...   */}
            {open && (
                <ul className='menu' onClick={() => setOpen(false)}>
                    {menu}
                </ul>
            )}
        </div>
    );
};

export default DropDown