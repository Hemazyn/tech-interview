import React, { Suspense } from 'react';
import QuestionsPage from '@/app/questions/QuestionsPage';
import { Loading } from '@/components';

export default function Questions() {
     return (
          <Suspense fallback={<Loading />}>
               <QuestionsPage />
          </Suspense>
     );
}