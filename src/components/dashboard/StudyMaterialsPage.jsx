import React from 'react';
import { useParams } from 'react-router-dom';

const resources = {
  c: ['https://www.learn-c.org/', 'https://www.tutorialspoint.com/cprogramming/index.htm'],
  java: ['https://www.javatpoint.com/', 'https://docs.oracle.com/javase/tutorial/'],
  'c++': ['https://www.learncpp.com/', 'https://cplusplus.com/']
};

function StudyMaterialsPage() {
  const { subject, type } = useParams();

  return (
    <div className="study-materials">
      <h2>Study Materials for {subject.toUpperCase()} ({type})</h2>
      <ul>
        {(resources[subject.toLowerCase()] || []).map((link, i) => (
          <li key={i}><a href={link} target="_blank" rel="noreferrer">{link}</a></li>
        ))}
      </ul>
    </div>
  );
}

export default StudyMaterialsPage;
