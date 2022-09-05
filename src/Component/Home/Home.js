import React from 'react';
import Footer from '../Footer/Footer';
import Cover from './Cover';
import Featured from './Featured';

const Home = ({handleAdd,handleRemove}) => {
    return (
        <div>
            <Cover/>
            <Featured handleAdd={handleAdd} handleRemove={handleRemove}/>
            <Footer/>
        </div>
    );
};

export default Home;