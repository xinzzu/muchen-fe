import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './Home.css';
import Button from 'react-bootstrap/Button';
import ModalCreate from '../components/ModalCreate';
import { Modal } from 'react-bootstrap';

function Home() {
  const [SisaUang, setSisaUang] = useState(0);
  const [persentaseUang, setPersentaseUang] = useState(0);
  const [pemasukkanUang, setPemasukkanUang] = useState(0);
  const [pengeluaranUang, setPengeluaranUang] = useState(0);
  const [transaksiIN, setTransaksiIN] = useState(0);
  const [transaksiOUT, setTransaksiOUT] = useState(0);
  const [summary, setSummary] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editCategory, setEditCategory] = useState('');
  const [editDeskripsi, setEditDeskripsi] = useState('');
  const [editTanggal, setEditTanggal] = useState('');
  const [editNominal, setEditNominal] = useState('');

  const fetchData = async () => {
    try {
      const response = await axios.get('https://muchen-backend.vercel.app/api/summary');
      setSummary(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const tambahItem = async (objek) => {
    try {
      const response = await axios.post('https://muchen-backend.vercel.app/api/summary', objek);
      const newData = [...summary, response.data];
      setSummary(newData);
    } catch (error) {
      console.log(error);
    }
  };

  const hapusItem = async (index) => {
    try {
      const itemToDelete = summary[index];
      await axios.delete(`https://muchen-backend.vercel.app/api/summary/${itemToDelete._id}`);
      const updatedSummary = [...summary];
      updatedSummary.splice(index, 1);
      setSummary(updatedSummary);
    } catch (error) {
      console.log(error);
    }
  };

  const fnHitung = useCallback(() => {
    let dataUangIN = summary.filter((item) => item.category === 'IN');
    let nominalUangIN = dataUangIN.map((item) => parseInt(item.nominal));
    let jumlahUangIn = nominalUangIN.reduce((total, num) => total + num, 0);

    let dataUangOUT = summary.filter((item) => item.category === 'OUT');
    let nominalUangOUT = dataUangOUT.map((item) => parseInt(item.nominal));
    let jumlahUangOUT = nominalUangOUT.reduce((total, num) => total + num, 0);

    setPemasukkanUang(jumlahUangIn);
    setTransaksiIN(dataUangIN.length);
    setPengeluaranUang(jumlahUangOUT);
    setTransaksiOUT(dataUangOUT.length);
    setSisaUang(jumlahUangIn - jumlahUangOUT);
    setPersentaseUang(((jumlahUangIn - jumlahUangOUT) / jumlahUangIn) * 100);
  }, [summary]);

  useEffect(() => {
    fetchData();
  }, [summary]);

  useEffect(() => {
    fnHitung();
  }, [fnHitung]);

    const handleOpenModal = (index, category, deskripsi, tanggal, nominal) => {
      setEditIndex(index);
      setEditCategory(category);
      setEditDeskripsi(deskripsi);
      setEditTanggal(tanggal);
      setEditNominal(nominal);
      setShowModal(true);
    };

    const handleCloseModal = () => {
      setShowModal(false);
    };

    const handleSaveChanges = async () => {
      try {
        const updatedItem = {
          _id: summary[editIndex]._id,
          category: editCategory,
          deskripsi: editDeskripsi,
          tanggal: editTanggal,
          nominal: editNominal,
        };
        await axios.put(`https://muchen-backend.vercel.app/api/summary/${updatedItem._id}`, updatedItem);
        const updatedSummary = [...summary];
        updatedSummary[editIndex] = updatedItem;
        setSummary(updatedSummary);
        handleCloseModal();
      } catch (error) {
        console.log(error);
      }
    };
    
    return (
      <>
        <div className='container py-5'>
          <div className='row'>
            <div className='col-12 text-center'>
              <h1 className='fw-bold'>Kos Cash Flow</h1>
              <hr className='w-75 mx-auto' />
              <h2 className='fw-bold'>Rp. {SisaUang},-</h2>
              <span className='title-md'>uang kamu tersisa {persentaseUang}% lagi</span>
            </div>
          </div>

          <div className='row mt-4'>
            <div className='col-6'>
              <div className='card-wrapper p-4'>
                <div className='icon-wrapper mb-1'>
                  <i className='bi bi-wallet2'></i>
                </div>
                <span className='title-sm'>Pemasukkan</span>
                <h3 className='fw-bold'>Rp. {pemasukkanUang},-</h3>
                <div>
                  <span className='title-sm text-ungu fw-bold'>{transaksiIN}</span>
                  <span className='title-sm'>Transaksi</span>
                </div>
              </div>
            </div>

            <div className='col-6'>
              <div className='card-wrapper p-4'>
                <div className='icon-wrapper mb-1'>
                  <i className='bi bi-cash-coin'></i>
                </div>
                <span className='title-sm'>Pengeluaran</span>
                <h3 className='fw-bold'>Rp. {pengeluaranUang},-</h3>
                <div>
                  <span className='title-sm text-ungu fw-bold'>{transaksiOUT}</span>
                  <span className='title-sm'>Transaksi</span>
                </div>
              </div>
            </div>
          </div>

          <div className='row mt-5'>
            <div className='col-12 d-flex justify-content-between align-items-center'>
              <h4 className='ringkasan'>Ringkasan Transaksi</h4>
              <div className='wrapper-button d-flex'>
                <ModalCreate
                  action={tambahItem}
                  category='IN'
                  variant='button btn-ungu px-3 py-2 me-1'
                  text='Pemasukkan'
                  icon='bi bi-patch-plus-fill'
                  modalheading='Tambahkan Pemasukkan'
                />
                <ModalCreate
                  action={tambahItem}
                  category='OUT'
                  variant='button btn-pink px-3 py-2'
                  text='Pengeluaran'
                  icon='bi bi-patch-minus-fill'
                  modalheading='Tambahkan Pengeluaran'
                />
              </div>
            </div>
          </div>

          <div className='row mt-4'>
            {summary.length < 1 ? (
              <Alert />
            ) : (
              <table className='table'>
                <thead>
                  <tr>
                    <th scope='col'>Kategori</th>
                    <th scope='col'>Deskripsi</th>
                    <th scope='col'>Tanggal</th>
                    <th scope='col'>Nominal</th>
                    <th scope='col'>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {summary.map((sum, index) => {
                    return (
                      <tr key={index}>
                        <td>{sum.category}</td>
                        <td>{sum.deskripsi}</td>
                        <td>{sum.tanggal}</td>
                        <td>Rp. {sum.nominal},-</td>
                        <td>
                          <Button variant='primary' size='sm' onClick={() => handleOpenModal(index, sum.category, sum.deskripsi, sum.tanggal, sum.nominal)}>
                            Edit
                          </Button>
                          <Button variant='danger' size='sm' onClick={() => hapusItem(index)}>
                            Hapus
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>

          <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Transaksi</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className='mb-3'>
                <label htmlFor='editCategory' className='form-label'>
                  Kategori
                </label>
                <input
                  type='text'
                  className='form-control'
                  id='editCategory'
                  value={editCategory}
                  onChange={(e) => setEditCategory(e.target.value)}
                />
              </div>
              <div className='mb-3'>
                <label htmlFor='editDeskripsi' className='form-label'>
                  Deskripsi
                </label>
                <input
                  type='text'
                  className='form-control'
                  id='editDeskripsi'
                  value={editDeskripsi}
                  onChange={(e) => setEditDeskripsi(e.target.value)}
                />
              </div>
              <div className='mb-3'>
                <label htmlFor='editTanggal' className='form-label'>
                  Tanggal
                </label>
                <input
                  type='text'
                  className='form-control'
                  id='editTanggal'
                  value={editTanggal}
                  onChange={(e) => setEditTanggal(e.target.value)}
                />
              </div>
              <div className='mb-3'>
                <label htmlFor='editNominal' className='form-label'>
                  Nominal
                </label>
                <input
                  type='text'
                  className='form-control'
                  id='editNominal'
                  value={editNominal}
                  onChange={(e) => setEditNominal(e.target.value)}
                />
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant='secondary' onClick={handleCloseModal}>
                Batal
              </Button>
              <Button variant='primary' onClick={handleSaveChanges}>
                Simpan
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </>
    );
  }

  function Alert() {
    return <h1>Data Masih Kosong</h1>;
  }

  export default Home;