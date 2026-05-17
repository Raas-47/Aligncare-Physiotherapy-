/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Booking from './pages/Booking';
import Exercises from './pages/Exercises';
import PainCheck from './pages/PainCheck';

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="book" element={<Booking />} />
            <Route path="exercises" element={<Exercises />} />
            <Route path="pain-check" element={<PainCheck />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}
