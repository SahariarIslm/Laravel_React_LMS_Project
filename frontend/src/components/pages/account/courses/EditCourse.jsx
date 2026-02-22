import React from 'react'
import Layout from '../../../common/Layout'
import UserSidebar from '../../../common/UserSidebar'
import { useNavigate } from 'react-router-dom' 
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { apiUrl, token } from '../../../common/config'
import toast from 'react-hot-toast'

const EditCourse = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const navigate = useNavigate();
    const onSubmit = async (data) => {
        await fetch(
            `${apiUrl}/courses`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(data)
                }
        )
        .then(res=> res.json())
        .then(result=> {
            console.log(result);
            if(result.status == 200){
                toast.success(result.message);
                // redirect after successfully submission 
                navigate('/account/courses/edit/'+result.data.id)
            }else{
                toast.error(result.message);
            }
        })
    }
    return (
        <Layout>
            <section className='section-4'>
                <div className='container pb-5 pt-3'>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/account">Account</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">Edit Course</li>
                        </ol>
                    </nav>
                    <div className='row'>
                        <div className='col-md-12 mt-5 mb-3'>
                            <div className='d-flex justify-content-between'>
                                <h2 className='h4 mb-0 pb-0'>Create Course</h2>
                            </div>
                        </div>
                        <div className='col-lg-3 account-sidebar'>
                            <UserSidebar/>
                        </div>
                        <div className='col-lg-9'>
                            <div className='row'>
                                <div className='col-md-7'>
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className='card brder-0 shadow-lg'>
                                            <div className='card-body p-4'>
                                                <h4 className='h5 border-bottom pb3 mb-3'>Course Details</h4>
                                                <div className='mb-3'>
                                                    <label className='form-label' htmlFor='title'>Title</label>
                                                    <input
                                                        {
                                                            ...register('title', { 
                                                                required: 'The title is required.' 
                                                            })
                                                        }
                                                        type="text" 
                                                        className={`form-control ${errors.title && 'is-invalid'}`}
                                                        placeholder='Enter course title'
                                                    />
                                                    {
                                                        errors.title && <p className="invalid-feedback">{errors.title.message}</p>
                                                    }
                                                </div>
                                                <div className='mb-3'>
                                                    <label className='form-label' htmlFor='category' id='category'>Category</label>
                                                    <select className='form-select'>
                                                        <option value="">Select a Category</option>
                                                    </select>
                                                </div>
                                                <div className='mb-3'>
                                                    <label className='form-label' htmlFor='level' id='level'>Level</label>
                                                    <select className='form-select'>
                                                        <option value="">Select a Level</option>
                                                    </select>
                                                </div>
                                                <div className='mb-3'>
                                                    <label className='form-label' htmlFor='language' id='language'>Language</label>
                                                    <select className='form-select'>
                                                        <option value="">Select a Language</option>
                                                    </select>
                                                </div>
                                                <div className='mb-3'>
                                                    <label className='form-label' htmlFor='language' id='language'>Description</label>
                                                    <textarea placeholder="Description" rows={5} id="description" className='form-control'></textarea>
                                                </div>
                                                <h4 className='h5 border-bottom pb3 mb-3'>Pricing</h4>
                                                <div className='mb-3'>
                                                    <label className='form-label' htmlFor='sell-price'>Sell Price</label>
                                                    <input
                                                        {
                                                            ...register('title', { 
                                                                required: 'The title is required.' 
                                                            })
                                                        }
                                                        type="text" 
                                                        className={`form-control ${errors.title && 'is-invalid'}`}
                                                        placeholder='Sell Price'
                                                        id='sell-price'
                                                    />
                                                    {
                                                        errors.title && <p className="invalid-feedback">{errors.title.message}</p>
                                                    }
                                                </div>
                                                <div className='mb-3'>
                                                    <label className='form-label' htmlFor='cross-price'>Cross Price</label>
                                                    <input
                                                        {
                                                            ...register('title', { 
                                                                required: 'The cross-price is required.' 
                                                            })
                                                        }
                                                        type="text" 
                                                        className={`form-control ${errors.title && 'is-invalid'}`}
                                                        placeholder='Cross Price'
                                                        id='cross-price'
                                                    />
                                                    {
                                                        errors.title && <p className="invalid-feedback">{errors.title.message}</p>
                                                    }
                                                </div>
                                                <button className='btn btn-primary'>Update</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div className='col-md-5'>
                                    
                                </div>
                            </div>
                        </div>
                    </div> 
                </div>
            </section>
        </Layout>
    )
}

export default EditCourse
