import React, { Suspense } from 'react';
import QuestionsPage from '../../app/questions/QuestionsPage';

export default function Questions() {
     return (
          <Suspense fallback={<div>Loading questions...</div>}>
               <QuestionsPage />
          </Suspense>
     );
}
