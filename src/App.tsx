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
import Dashboard from './pages/Dashboard';

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
            <Route path="dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}
