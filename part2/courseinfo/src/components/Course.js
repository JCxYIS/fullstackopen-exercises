// import React, { Component } from 'react';
import Content from './Content';
import Header from './Header';

const Course = ({course}) => (
    <div>        
        <Header course={course.name} />
        <Content parts={course.parts} />
    </div>
);

export default Course;