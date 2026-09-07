import * as React from 'react';
import './style.css';

const DropDown = () => {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(!open);
    };

    return (
        <div className='dropdown'>
            <button onClick={handleOpen}>Select Location</button>
            {/* ? if open true... : if false...   */}

            {open ? (
                <ul className='menu'>
                    <li className='menu-item'>
                        <button>Location 1</button>
                    </li>
                    <li className='menu-item'>
                        <button>Location 2</button>
                    </li>
                </ul>
            ) : null}
            {open ? <div>Is Open </div> : <div>Is Closed</div>}
        </div>
    );
};

export default DropDown