import React from 'react';
import NavbarComponent from '../components/Navbar';

function About() {
  return (
    <div>
      <NavbarComponent />
      <div className='container py-5'>
        <div className='row'>
          <div className='col-12 text-center'>
            <h2 className='fw-bold'>About Kos Cash Flow</h2>
          </div>
          <div className='col-8 offset-2'>
            <p className='text-center'>
              Kos Cash Flow adalah aplikasi yang dapat membantu pengeluaran keuangan bulanan, mingguan, dan sebagainya. Aplikasi ini membantu Anda menghitung pendapatan dan pengeluaran Anda, memberikan wawasan yang berharga ke dalam kebiasaan belanja Anda.
            </p>
            <p className='text-center'>
              Dengan Kos Cash Flow, Anda dapat dengan mudah menambahkan pengeluaran, mengelompokkannya, dan melihat ringkasan pengeluaran bulanan Anda. Aplikasi ini juga membantu Anda menganalisis situasi keuangan Anda.
            </p>
            <p className='text-center'>
              Mulailah kelola keuangan Anda hari ini dengan Kos Cash Flow, Anda dapat mengendalikan biaya pengeluaran Anda!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
