import { useRef, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, shallowEqual } from 'react-redux';
import Widget from '../../../../components/widget';
import axios from 'axios';
import url from '../../../../config/url';
import { FiX, FiCheck } from 'react-icons/fi';
import setAuthToken from '../../../../functions/setAuthToken';
import { ProcessorSpinner, Progress } from '../../../../components/spiner/index';
import { useRouter } from 'next/router';
import jwt from "jsonwebtoken";


const AnnualSupDocs = () => {
    //handle file
    const [file, setFile] = useState(null);
    const [file2, setFile2] = useState(null);
    const [file3, setFile3] = useState(null);
    const [file4, setFile4] = useState(null);
    const [file5, setFile5] = useState(null);
    const [file6, setFile6] = useState(null);
    const [file7, setFile7] = useState(null);
    const [file8, setFile8] = useState(null);
    const [file9, setFile9] = useState(null);
    const [file10, setFile10] = useState(null);
    const [file11, setFile11] = useState(null);
    const [file12, setFile12] = useState(null);
    const [file13, setFile13] = useState(null);
    const [file14, setFile14] = useState(null);
    const [file15, setFile15] = useState(null);
    const [file16, setFile16] = useState(null);
    const [file17, setFile17] = useState(null);
    const [file18, setFile18] = useState(null);
    const [uploadedFile, setUploadedFile] = useState(false);
    const [uploadedFile2, setUploadedFile2] = useState(false);
    const [uploadedFile3, setUploadedFile3] = useState(false);
    const [uploadedFile4, setUploadedFile4] = useState(false);
    const [uploadedFile5, setUploadedFile5] = useState(false);
    const [uploadedFile6, setUploadedFile6] = useState(false);
    const [uploadedFile7, setUploadedFile7] = useState(false);
    const [uploadedFile8, setUploadedFile8] = useState(false);
    const [uploadedFile9, setUploadedFile9] = useState(false);
    const [uploadedFile10, setUploadedFile10] = useState(false);
    const [uploadedFile11, setUploadedFile11] = useState(false);
    const [uploadedFile12, setUploadedFile12] = useState(false);
    const [uploadedFile13, setUploadedFile13] = useState(false);
    const [uploadedFile14, setUploadedFile14] = useState(false);
    const [uploadedFile15, setUploadedFile15] = useState(false);
    const [uploadedFile16, setUploadedFile16] = useState(false);
    const [uploadedFile17, setUploadedFile17] = useState(false);
    const [uploadedFile18, setUploadedFile18] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [disabled2, setDisabled2] = useState(true);
    const [disabled3, setDisabled3] = useState(true);
    const [disabled4, setDisabled4] = useState(true);
    const [disabled5, setDisabled5] = useState(true);
    const [disabled6, setDisabled6] = useState(true);
    const [disabled7, setDisabled7] = useState(true);
    const [disabled8, setDisabled8] = useState(true);
    const [disabled9, setDisabled9] = useState(true);
    const [disabled10, setDisabled10] = useState(true);
    const [disabled11, setDisabled11] = useState(true);
    const [disabled12, setDisabled12] = useState(true);
    const [disabled13, setDisabled13] = useState(true);
    const [disabled14, setDisabled14] = useState(true);
    const [disabled15, setDisabled15] = useState(true);
    const [disabled16, setDisabled16] = useState(true);
    const [disabled17, setDisabled17] = useState(true);
    const [disabled18, setDisabled18] = useState(true);
    const [uploadPercentage, setUploadPercentage] = useState(0);
    const [uploadPercentage2, setUploadPercentage2] = useState(0);
    const [uploadPercentage3, setUploadPercentage3] = useState(0);
    const [uploadPercentage4, setUploadPercentage4] = useState(0);
    const [uploadPercentage5, setUploadPercentage5] = useState(0);
    const [uploadPercentage6, setUploadPercentage6] = useState(0);
    const [uploadPercentage7, setUploadPercentage7] = useState(0);
    const [uploadPercentage8, setUploadPercentage8] = useState(0);
    const [uploadPercentage9, setUploadPercentage9] = useState(0);
    const [uploadPercentage10, setUploadPercentage10] = useState(0);
    const [uploadPercentage11, setUploadPercentage11] = useState(0);
    const [uploadPercentage12, setUploadPercentage12] = useState(0);
    const [uploadPercentage13, setUploadPercentage13] = useState(0);
    const [uploadPercentage14, setUploadPercentage14] = useState(0);
    const [uploadPercentage15, setUploadPercentage15] = useState(0);
    const [uploadPercentage16, setUploadPercentage16] = useState(0);
    const [uploadPercentage17, setUploadPercentage17] = useState(0);
    const [uploadPercentage18, setUploadPercentage18] = useState(0);
    const [submitting, setSubmitting] = useState(false);
    const [submitting2, setSubmitting2] = useState(false);
    const [submitting3, setSubmitting3] = useState(false);
    const [submitting4, setSubmitting4] = useState(false);
    const [submitting5, setSubmitting5] = useState(false);
    const [submitting6, setSubmitting6] = useState(false);
    const [submitting7, setSubmitting7] = useState(false);
    const [submitting8, setSubmitting8] = useState(false);
    const [submitting9, setSubmitting9] = useState(false);
    const [submitting10, setSubmitting10] = useState(false);
    const [submitting11, setSubmitting11] = useState(false);
    const [submitting12, setSubmitting12] = useState(false);
    const [submitting13, setSubmitting13] = useState(false);
    const [submitting14, setSubmitting14] = useState(false);
    const [submitting15, setSubmitting15] = useState(false);
    const [submitting16, setSubmitting16] = useState(false);
    const [submitting17, setSubmitting17] = useState(false);
    const [submitting18, setSubmitting18] = useState(false);
    const [year, setYear] = useState("");
    const [submitErr, setSubmitErr] = useState(false);
    const { register, handleSubmit, watch } = useForm();
    const modalRef = useRef(null);
    const [open, setOpen] = useState(false);
    const router = useRouter()

    useEffect(() => {
        if (router && router.query) {
            let selecteYear = router.query.ref;
            setYear(selecteYear);
        }

    }, [router]);

    const { palettes, auth } = useSelector(
        (state) => ({
            palettes: state.palettes,
            auth: state.authentication.auth
        }),
        shallowEqual
    );
    const decoded = jwt.decode(auth);
    const kgtin = decoded.kgtin
    
    let { background } = {
        ...palettes,
    };

    const show = () => {
        setOpen(true);
    };

    const hide = () => {
        setOpen(false);
        router.push('/dashboard');
    };

    const onChange = e => {
        const file = e.target.files[0]
        if (file) {
            if (!file) {
                setFile(null);
                setDisabled(true);
                return;
            }
            if (file.type !== "image/jpeg" && file.type !== "application/pdf" && file.type !== "image/png") {
                alert("file type not allowed. only pdf, png and jpeg are allowed");
                setFile(null);
                setDisabled(true);
                return;
            }
            if (file.size > 1024 * 100) {
                alert("file too large..file size shoulde not exceed 100kb");
                return
            }
            else {
                setFile(file);
                setDisabled(false);
            }
        }
    };

    const onChange2 = e => {
        const file2 = e.target.files[0]
        if (file2) {
            if (!file2) {
                setFile2(null);
                setDisabled2(true);
                return;
            }
            if (file2.type !== "image/jpeg" && file2.type !== "application/pdf" && file2.type !== "image/png") {
                alert("file type not allowed. only pdf, png and jpeg are allowed");
                setFile2(null);
                setDisabled2(true);
                return;
            }
            if (file2.size > 1024 * 100) {
                alert("file too large..file size shoulde not exceed 100kb");
                return
            }
            else {
                setFile2(file2);
                setDisabled2(false);
            }
        }
    };

    const onChange3 = e => {
        const file3 = e.target.files[0]
        if (file3) {
            if (!file3) {
                setFile3(null);
                setDisabled3(true);
                return;
            }
            if (file3.type !== "image/jpeg" && file3.type !== "application/pdf" && file3.type !== "image/png") {
                alert("file type not allowed. only pdf, png and jpeg are allowed");
                setFile3(null);
                setDisabled3(true);
                return;
            }
            if (file3.size > 1024 * 100) {
                alert("file too large..file size shoulde not exceed 100");
                return
            }
            else {
                setFile3(file3);
                setDisabled3(false);
            }
        }
    };

    const onChange4 = e => {
        const file4 = e.target.files[0]
        const filetype = ['text/csv', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
        if (file4) {
            if (!file4) {
                setFile4(null);
                setDisabled4(true);
                return;
            }
            if (!filetype.includes(file4.type)) {
                alert("file type not allowed. only excel/CSV is allowed");
                setFile4(null);
                setDisabled4(true);
                return;
            }
            if (file4.size > 1024 * 100) {
                alert("file too large..file size shoulde not exceed 100kb");
                return
            }
            else {
                setFile4(file4);
                setDisabled4(false);
            }
        }
    };

    const onChange5 = e => {
        const file5 = e.target.files[0]
        if (file5) {
            if (!file5) {
                setFile5(null);
                setDisabled5(true);
                return;
            }
            if (file5.type !== "image/jpeg" && file5.type !== "application/pdf" && file5.type !== "image/png") {
                alert("file type not allowed. only excel is allowed");
                setFile5(null);
                setDisabled5(true);
                return;
            }
            if (file5.size > 1024 * 100) {
                alert("file too large..file size shoulde not exceed 100kb");
                return
            }
            else {
                setFile5(file5);
                setDisabled5(false);
            }
        }
    };

    const onChange6 = e => {
        const file6 = e.target.files[0]
        const filetype = ['text/csv',
            'application/vnd.ms-excel',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ];
        if (file6) {
            if (!file6) {
                setFile6(null);
                setDisabled6(true);
                return;
            }
            if (!filetype.includes(file6.type)) {
                alert("file type not allowed. only pdf, word, excel or csv are allowed");
                setFile6(null);
                setDisabled6(true);
                return;
            }
            if (file6.size > 1024 * 100) {
                alert("file too large..file size shoulde not exceed 100kb");
                return
            }
            else {
                console.log(file6.type);
                setFile6(file6);
                setDisabled6(false);
            }
        }
    };

    const onChange7 = e => {
        const file7 = e.target.files[0]
        if (file7) {
            if (!file7) {
                setFile7(null);
                setDisabled7(true);
                return;
            }
            // if (file7.type !== "application/vnd.ms-excel" && file7.type !== "application/pdf" && file7.type !== "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
            //   alert("file type not allowed. only pdf word or excel are allowed");
            //   setFile7(null);
            //   setDisabled7(true);
            //   return;
            // }
            // if (file7.size > 1024 * 200) {
            //   alert("file too large..file size shoulde not exceed 200kb");
            //   return
            // }
            else {
                setFile7(file7);
                setDisabled7(false);
            }
        }
    };

    const onChange8 = e => {
        const file8 = e.target.files[0]
        if (file8) {
            if (!file8) {
                setFile8(null);
                setDisabled8(true);
                return;
            }
            if (file8.type !== "application/vnd.ms-excel" && file8.type !== "application/pdf") {
                alert("file type not allowed. only pdf or excel are allowed");
                setFile8(null);
                setDisabled8(true);
                return;
            }
            if (file8.size > 1024 * 100) {
                alert("file too large..file size shoulde not exceed 100kb");
                return
            }
            else {
                setFile8(file8);
                setDisabled8(false);
            }
        }
    };

    const onChange9 = e => {
        const file9 = e.target.files[0]
        if (file9) {
            if (!file9) {
                setFile9(null);
                setDisabled9(true);
                return;
            }
            if (file9.type !== "image/jpeg" && file9.type !== "application/pdf" && file9.type !== "image/png") {
                alert("file type not allowed. only pdf or excel are allowed");
                setFile9(null);
                setDisabled9(true);
                return;
            }
            if (file9.size > 1024 * 100) {
                alert("file too large..file size shoulde not exceed 100kb");
                return
            }
            else {
                setFile9(file9);
                setDisabled9(false);
            }
        }
    };

    const onChange10 = e => {
        const file10 = e.target.files[0]
        if (file10) {
            if (!file10) {
                setFile10(null);
                setDisabled10(true);
                return;
            }
            if (file10.type !== "image/jpeg" && file10.type !== "application/pdf" && file10.type !== "image/png") {
                alert("file type not allowed. only pdf or excel are allowed");
                setFile10(null);
                setDisabled10(true);
                return;
            }
            if (file10.size > 1024 * 100) {
                alert("file too large..file size shoulde not exceed 100kb");
                return
            }
            else {
                setFile10(file10);
                setDisabled10(false);
            }
        }
    };

    const onChange11 = e => {
        const file11 = e.target.files[0]
        if (file11) {
            if (!file11) {
                setFile11(null);
                setDisabled11(true);
                return;
            }
            if (file11.type !== "image/jpeg" && file11.type !== "application/pdf" && file11.type !== "image/png") {
                alert("file type not allowed. only pdf or excel are allowed");
                setFile11(null);
                setDisabled11(true);
                return;
            }
            if (file11.size > 1024 * 100) {
                alert("file too large..file size shoulde not exceed 100kb");
                return
            }
            else {
                setFile11(file11);
                setDisabled11(false);
            }
        }
    };

    const onChange12 = e => {
        const file12 = e.target.files[0]
        if (file12) {
            if (!file12) {
                setFile12(null);
                setDisabled12(true);
                return;
            }
            if (file12.type !== "image/jpeg" && file12.type !== "application/pdf" && file12.type !== "image/png") {
                alert("file type not allowed. only pdf or excel are allowed");
                setFile12(null);
                setDisabled12(true);
                return;
            }
            if (file12.size > 1024 * 100) {
                alert("file too large..file size shoulde not exceed 100kb");
                return
            }
            else {
                setFile12(file12);
                setDisabled12(false);
            }
        }
    };
    const onChange13 = e => {
        const file13 = e.target.files[0]
        if (file13) {
            if (!file13) {
                setFile13(null);
                setDisabled13(true);
                return;
            }
            if (file13.type !== "image/jpeg" && file13.type !== "application/pdf" && file13.type !== "image/png") {
                alert("file type not allowed. only pdf or excel are allowed");
                setFile13(null);
                setDisabled13(true);
                return;
            }
            if (file13.size > 1024 * 100) {
                alert("file too large..file size shoulde not exceed 100kb");
                return
            }
            else {
                setFile13(file13);
                setDisabled13(false);
            }
        }
    };

    const onChange14 = e => {
        const file14 = e.target.files[0]
        if (file14) {
            if (!file14) {
                setFile14(null);
                setDisabled14(true);
                return;
            }
            if (file14.type !== "image/jpeg" && file14.type !== "application/pdf" && file14.type !== "image/png") {
                alert("file type not allowed. only pdf or excel are allowed");
                setFile14(null);
                setDisabled14(true);
                return;
            }
            if (file14.size > 1024 * 100) {
                alert("file too large..file size shoulde not exceed 100kb");
                return
            }
            else {
                setFile14(file14);
                setDisabled14(false);
            }
        }
    };

    const onChange15 = e => {
        const file15 = e.target.files[0]
        if (file15) {
            if (!file15) {
                setFile15(null);
                setDisabled15(true);
                return;
            }
            if (file15.type !== "image/jpeg" && file15.type !== "application/pdf" && file15.type !== "image/png") {
                alert("file type not allowed. only pdf or excel are allowed");
                setFile15(null);
                setDisabled15(true);
                return;
            }
            if (file15.size > 1024 * 100) {
                alert("file too large..file size shoulde not exceed 100kb");
                return
            }
            else {
                setFile15(file15);
                setDisabled15(false);
            }
        }
    };

    const onChange16 = e => {
        const file16 = e.target.files[0]
        if (file16) {
            if (!file16) {
                setFile16(null);
                setDisabled16(true);
                return;
            }
            if (file16.type !== "image/jpeg" && file16.type !== "application/pdf" && file16.type !== "image/png") {
                alert("file type not allowed. only pdf or excel are allowed");
                setFile16(null);
                setDisabled16(true);
                return;
            }
            if (file16.size > 1024 * 100) {
                alert("file too large..file size shoulde not exceed 100kb");
                return
            }
            else {
                setFile16(file16);
                setDisabled16(false);
            }
        }
    };

    const onChange17 = e => {
        const file17 = e.target.files[0]
        if (file17) {
            if (!file17) {
                setFile17(null);
                setDisabled17(true);
                return;
            }
            if (file17.type !== "image/jpeg" && file17.type !== "application/pdf" && file17.type !== "image/png") {
                alert("file type not allowed. only pdf or excel are allowed");
                setFile17(null);
                setDisabled17(true);
                return;
            }
            if (file17.size > 1024 * 100) {
                alert("file too large..file size shoulde not exceed 100kb");
                return
            }
            else {
                setFile17(file17);
                setDisabled17(false);
            }
        }
    };

    const onChange18 = e => {
        const file18 = e.target.files[0]
        if (file18) {
            if (!file18) {
                setFile18(null);
                setDisabled18(true);
                return;
            }
            if (file18.type !== "image/jpeg" && file18.type !== "application/pdf" && file18.type !== "image/png") {
                alert("file type not allowed. only pdf or excel are allowed");
                setFile18(null);
                setDisabled18(true);
                return;
            }
            if (file18.size > 1024 * 100) {
                alert("file too large..file size shoulde not exceed 100kb");
                return
            }
            else {
                setFile18(file18);
                setDisabled18(false);
            }
        }
    };

    const onSubmit = async () => {
        const formData = new FormData();
        formData.append('employer_id', kgtin);
        formData.append('cover_letter', file);
        formData.append('year', year);
        setAuthToken();
        setSubmitting(true)
        try {
            const res = await axios.post(`${url.BASE_URL}annual/upload-annual-doc`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: progressEvent => {
                    setUploadPercentage(
                        parseInt(
                            Math.round((progressEvent.loaded * 100) / progressEvent.total)
                        )
                    );
                }

            });

            setSubmitting(false)
            setUploadedFile(true);
            setFile(null)
            setDisabled(true)
            console.log(data.response.body);
        } catch (err) {
            if (err.response === 500) {
                console.log('There was a problem with the server');
            } else {
                console.log(err);
                setFile(null)
                setDisabled(true)
                setUploadPercentage(0)
                setSubmitting(false)
            }
        }

    };

    const onSubmit2 = async () => {
        const formData = new FormData();
        formData.append('employer_id', kgtin);
        formData.append('indv_return_letter', file2);
        formData.append('year', year);
        setAuthToken();
        setSubmitting2(true)
        try {
            const res = await axios.post(`${url.BASE_URL}annual/upload-annual-doc`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: progressEvent => {
                    setUploadPercentage2(
                        parseInt(
                            Math.round((progressEvent.loaded * 100) / progressEvent.total)
                        )
                    );
                }

            });

            setSubmitting2(false)
            setUploadedFile2(true);
            setFile2(null)
            setDisabled2(true)
            console.log(data.response.body);
        } catch (err) {
            if (err.response === 500) {
                console.log('There was a problem with the server');
            } else {
                console.log(err);
                setFile2(null)
                setDisabled2(true)
                setUploadPercentage2(0)
                setSubmitting2(false)
            }
        }

    };

    const onSubmit3 = async () => {
        const formData = new FormData();
        formData.append('exp_order_letter', file3);
        formData.append('employer_id', kgtin);
        formData.append('year', year);
        setAuthToken();
        setSubmitting3(true)
        try {
            const res = await axios.post(`${url.BASE_URL}annual/upload-annual-doc`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: progressEvent => {
                    setUploadPercentage3(
                        parseInt(
                            Math.round((progressEvent.loaded * 100) / progressEvent.total)
                        )
                    );
                }

            });

            setSubmitting3(false)
            setUploadedFile3(true);
            setFile3(null)
            setDisabled3(true)
            console.log(data.response.body);
        } catch (err) {
            if (err.response === 500) {
                console.log('There was a problem with the server');
            } else {
                console.log(err);
                setFile3(null)
                setDisabled3(true)
                setUploadPercentage3(0)
                setSubmitting3(false)
            }
        }

    };

    const onSubmit4 = async () => {

        const formData = new FormData();
        formData.append('employer_id', kgtin);
        formData.append('mnthly_pay_sched', file4);
        formData.append('year', year);
        setAuthToken();
        setSubmitting4(true)

        try {
            const res = await axios.post(`${url.BASE_URL}annual/upload-annual-doc`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: progressEvent => {
                    setUploadPercentage4(
                        parseInt(
                            Math.round((progressEvent.loaded * 100) / progressEvent.total)
                        )
                    );
                }

            });

            setSubmitting4(false)
            setUploadedFile4(true);
            setFile4(null)
            setDisabled4(true)
            console.log(data.response.body);
        } catch (err) {
            if (err.response === 500) {
                console.log('There was a problem with the server');
            } else {
                console.log(err);
                setFile4(null)
                setDisabled4(true)
                setUploadPercentage4(0)
                setSubmitting4(false)
            }
        }

    };

    const onSubmit5 = async () => {
        const formData = new FormData();
        formData.append('employer_id', kgtin);
        formData.append('paye_remittance', file5);
        formData.append('year', year);

        setAuthToken();
        setSubmitting5(true)

        try {
            const res = await axios.post(`${url.BASE_URL}annual/upload-annual-doc`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: progressEvent => {
                    setUploadPercentage5(
                        parseInt(
                            Math.round((progressEvent.loaded * 100) / progressEvent.total)
                        )
                    );
                }

            });

            setSubmitting5(false)
            setUploadedFile5(true);
            setFile5(null)
            setDisabled5(true)
            console.log(data.response.body);
        } catch (err) {
            if (err.response === 500) {
                console.log('There was a problem with the server');
            } else {
                console.log(err);
                setFile5(null)
                setDisabled5(true)
                setUploadPercentage5(0)
                setSubmitting5(false)
            }
        }
    };

    const onSubmit6 = async () => {

        const formData = new FormData();
        formData.append('employer_id', kgtin);
        formData.append('exit_staff_list', file6);
        formData.append('year', year);

        setAuthToken();
        setSubmitting6(true)

        try {
            const res = await axios.post(`${url.BASE_URL}annual/upload-annual-doc`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: progressEvent => {
                    setUploadPercentage6(
                        parseInt(
                            Math.round((progressEvent.loaded * 100) / progressEvent.total)
                        )
                    );
                }

            });

            setSubmitting6(false)
            setUploadedFile6(true);
            setFile6(null)
            setDisabled6(true)
            console.log(data.response.body);
        } catch (err) {
            if (err.response === 500) {
                console.log('There was a problem with the server');
            } else {
                console.log(err);
                setFile6(null)
                setDisabled6(true)
                setUploadPercentage6(0)
                setSubmitting6(false)
            }
        }

    };

    const onSubmit7 = async () => {
        const formData = new FormData();
        formData.append('employer_id', kgtin);
        formData.append('endyr_trial_bal', file7);
        formData.append('year', year);
        setAuthToken();
        setSubmitting7(true)

        try {
            const res = await axios.post(`${url.BASE_URL}annual/upload-annual-doc`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: progressEvent => {
                    setUploadPercentage7(
                        parseInt(
                            Math.round((progressEvent.loaded * 100) / progressEvent.total)
                        )
                    );
                }

            });

            setSubmitting7(false)
            setUploadedFile7(true);
            setFile7(null)
            setDisabled7(true)
            console.log(data.response.body);
        } catch (err) {
            if (err.response === 500) {
                console.log('There was a problem with the server');
            } else {
                console.log(err);
                setFile7(null)
                setDisabled7(true)
                setUploadPercentage7(0)
                setSubmitting7(false)
            }
        }
    };

    const onSubmit8 = async () => {
        const formData = new FormData();
        formData.append('employer_id', kgtin);
        formData.append('wht_tax_deduct', file8);
        formData.append('year', year);

        setAuthToken();
        setSubmitting8(true)

        try {
            const res = await axios.post(`${url.BASE_URL}annual/upload-annual-doc`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: progressEvent => {
                    setUploadPercentage8(
                        parseInt(
                            Math.round((progressEvent.loaded * 100) / progressEvent.total)
                        )
                    );
                }

            });

            setSubmitting8(false)
            setUploadedFile8(true);
            setFile8(null)
            setDisabled8(true)
            console.log(data.response.body);
        } catch (err) {
            if (err.response === 500) {
                console.log('There was a problem with the server');
            } else {
                console.log(err);
                setFile8(null)
                setDisabled8(true)
                setUploadPercentage8(0)
                setSubmitting8(false)
            }
        }

    };

    const onSubmit9 = async () => {
        const formData = new FormData();
        formData.append('employer_id', kgtin);
        formData.append('wht_tax_receipts', file9);
        formData.append('year', year);

        setAuthToken();
        setSubmitting9(true)

        try {
            const res = await axios.post(`${url.BASE_URL}annual/upload-annual-doc`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: progressEvent => {
                    setUploadPercentage9(
                        parseInt(
                            Math.round((progressEvent.loaded * 100) / progressEvent.total)
                        )
                    );
                }

            });

            setSubmitting9(false)
            setUploadedFile9(true);
            setFile9(null)
            setDisabled9(true)
            console.log(data.response.body);
        } catch (err) {
            if (err.response === 500) {
                console.log('There was a problem with the server');
            } else {
                console.log(err);
                setFile9(null)
                setDisabled9(true)
                setUploadPercentage9(0)
                setSubmitting9(false)
            }
        }
    };

    const onSubmit10 = async () => {
        const formData = new FormData();
        formData.append('employer_id', kgtin);
        formData.append('mnthly_immi_returns', file10);
        formData.append('year', year);

        setAuthToken();
        setSubmitting10(true)

        try {
            const res = await axios.post(`${url.BASE_URL}annual/upload-annual-doc`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: progressEvent => {
                    setUploadPercentage10(
                        parseInt(
                            Math.round((progressEvent.loaded * 100) / progressEvent.total)
                        )
                    );
                }

            });

            setSubmitting10(false)
            setUploadedFile10(true);
            setFile10(null)
            setDisabled10(true)
            console.log(data.response.body);
        } catch (err) {
            if (err.response === 500) {
                console.log('There was a problem with the server');
            } else {
                console.log(err);
                setFile10(null)
                setDisabled10(true)
                setUploadPercentage10(0)
                setSubmitting10(false)
            }
        }

    };

    const onSubmit11 = async () => {
        const formData = new FormData();
        formData.append('employer_id', kgtin);
        formData.append('dev_levy_receipts', file11);
        formData.append('year', year);

        setAuthToken();
        setSubmitting11(true)

        try {
            const res = await axios.post(`${url.BASE_URL}annual/upload-annual-doc`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: progressEvent => {
                    setUploadPercentage11(
                        parseInt(
                            Math.round((progressEvent.loaded * 100) / progressEvent.total)
                        )
                    );
                }

            });

            setSubmitting11(false)
            setUploadedFile11(true);
            setFile11(null)
            setDisabled11(true)
            console.log(data.response.body);
        } catch (err) {
            if (err.response === 500) {
                console.log('There was a problem with the server');
            } else {
                console.log(err);
                setFile11(null)
                setDisabled11(true)
                setUploadPercentage11(0)
                setSubmitting11(false)
            }
        }
    };

    const onSubmit12 = async () => {
        const formData = new FormData();
        formData.append('employer_id', kgtin);
        formData.append('bus_premises_receipt', file12);
        formData.append('year', year);

        setAuthToken();
        setSubmitting12(true)

        try {
            const res = await axios.post(`${url.BASE_URL}annual/upload-annual-doc`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: progressEvent => {
                    setUploadPercentage12(
                        parseInt(
                            Math.round((progressEvent.loaded * 100) / progressEvent.total)
                        )
                    );
                }

            });

            setSubmitting12(false)
            setUploadedFile12(true);
            setFile12(null)
            setDisabled12(true)
            console.log(data.response.body);
        } catch (err) {
            if (err.response === 500) {
                console.log('There was a problem with the server');
            } else {
                console.log(err);
                setFile12(null)
                setDisabled12(true)
                setUploadPercentage12(0)
                setSubmitting12(false)
            }
        }

    };

    const onSubmit13 = async data => {
        const formData = new FormData();
        formData.append('employer_id', kgtin);
        formData.append('grnd_rent_receipts', file13);
        formData.append('year', year);
        setSubmitting13(true)

        try {
            const res = await axios.post(`${url.BASE_URL}annual/upload-annual-doc`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: progressEvent => {
                    setUploadPercentage13(
                        parseInt(
                            Math.round((progressEvent.loaded * 100) / progressEvent.total)
                        )
                    );
                }

            });

            setSubmitting13(false)
            setUploadedFile13(true);
            setFile13(null)
            setDisabled13(true)
            console.log(data.response.body);
        } catch (err) {
            if (err.response === 500) {
                console.log('There was a problem with the server');
            } else {
                console.log(err);
                setFile13(null)
                setDisabled13(true)
                setUploadPercentage13(0)
                setSubmitting13(false)
            }
        }
    };

    const onSubmit14 = async () => {
        const formData = new FormData();
        formData.append('employer_id', kgtin);
        formData.append('sscl', file14);
        formData.append('year', year);

        setAuthToken();
        setSubmitting14(true)

        try {
            const res = await axios.post(`${url.BASE_URL}annual/upload-annual-doc`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: progressEvent => {
                    setUploadPercentage14(
                        parseInt(
                            Math.round((progressEvent.loaded * 100) / progressEvent.total)
                        )
                    );
                }

            });

            setSubmitting14(false)
            setUploadedFile14(true);
            setFile14(null)
            setDisabled14(true)
            console.log(data.response.body);
        } catch (err) {
            if (err.response === 500) {
                console.log('There was a problem with the server');
            } else {
                console.log(err);
                setFile14(null)
                setDisabled14(true)
                setUploadPercentage14(0)
                setSubmitting14(false)
            }
        }

    };

    const onSubmit15 = async () => {
        const formData = new FormData();
        formData.append('employer_id', kgtin);
        formData.append('pension_remittance', file15);
        formData.append('year', year);
        setSubmitting15(true)

        try {
            const res = await axios.post(`${url.BASE_URL}annual/upload-annual-doc`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: progressEvent => {
                    setUploadPercentage15(
                        parseInt(
                            Math.round((progressEvent.loaded * 100) / progressEvent.total)
                        )
                    );
                }

            });

            setSubmitting15(false)
            setUploadedFile15(true);
            setFile15(null)
            setDisabled15(true)
            console.log(data.response.body);
        } catch (err) {
            if (err.response === 500) {
                console.log('There was a problem with the server');
            } else {
                console.log(err);
                setFile15(null)
                setDisabled15(true)
                setUploadPercentage15(0)
                setSubmitting15(false)
            }
        }

    };

    const onSubmit16 = async () => {

        const formData = new FormData();
        formData.append('employer_id', kgtin);
        formData.append('nhf_remittance', file16);
        formData.append('year', year);
        setSubmitting16(true)

        try {
            const res = await axios.post(`${url.BASE_URL}annual/upload-annual-doc`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: progressEvent => {
                    setUploadPercentage16(
                        parseInt(
                            Math.round((progressEvent.loaded * 100) / progressEvent.total)
                        )
                    );
                }

            });

            setSubmitting16(false)
            setUploadedFile16(true);
            setFile16(null)
            setDisabled16(true)
            console.log(data.response.body);
        } catch (err) {
            if (err.response === 500) {
                console.log('There was a problem with the server');
            } else {
                console.log(err);
                setFile16(null)
                setDisabled16(true)
                setUploadPercentage16(0)
                setSubmitting16(false)
            }
        }
    };

    const onSubmit17 = async () => {
        const formData = new FormData();
        formData.append('employer_id', kgtin);
        formData.append('nhis_remittance', file17);
        formData.append('year', year);
        setSubmitting17(true)

        try {
            const res = await axios.post(`${url.BASE_URL}annual/upload-annual-doc`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: progressEvent => {
                    setUploadPercentage17(
                        parseInt(
                            Math.round((progressEvent.loaded * 100) / progressEvent.total)
                        )
                    );
                }

            });

            setSubmitting17(false)
            setUploadedFile17(true);
            setFile17(null)
            setDisabled17(true)
            console.log(data.response.body);
        } catch (err) {
            if (err.response === 500) {
                console.log('There was a problem with the server');
            } else {
                console.log(err);
                setFile17(null)
                setDisabled17(true)
                setUploadPercentage17(0)
                setSubmitting17(false)
            }
        }

    };

    const onSubmit18 = async () => {
        const formData = new FormData();
        formData.append('employer_id', kgtin);
        formData.append('lap_remittance', file18);
        formData.append('year', year);
        setSubmitting18(true)

        try {
            const res = await axios.post(`${url.BASE_URL}annual/upload-annual-doc`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: progressEvent => {
                    setUploadPercentage18(
                        parseInt(
                            Math.round((progressEvent.loaded * 100) / progressEvent.total)
                        )
                    );
                }

            });

            setSubmitting18(false)
            setUploadedFile18(true);
            setFile18(null)
            setDisabled18(true)
            console.log(data.response.body);
        } catch (err) {
            if (err.response === 500) {
                console.log('There was a problem with the server');
            } else {
                console.log(err);
                setFile18(null)
                setDisabled18(true)
                setUploadPercentage18(0)
                setSubmitting18(false)
            }
        }

    };

    const SubmitUploads = () => {
        let kgtinyear = {
            "year": year
        }
        setSubmitting(true)
        axios.post(`${url.BASE_URL}annual/submit-annual-returns`, kgtinyear)
            .then(function (response) {
                setSubmitting(false)
                show()
            }).catch(function (error) {
                setSubmitting(false)
                if (error.response) {
                    alert(`${error.response.data.message} for ${year}`);
                }
                console.log(error);
            })

    }


    return (
        <>
            {open && (
                <>
                    <div className="modal-backdrop fade-in"></div>
                    <div
                        className={`modal show ${background === 'dark' ? 'dark' : ''}`}
                        data-background={background}
                    >
                        <div
                            className="relative w-auto lg:my-4 mx-auto lg:max-w-lg max-w-sm"
                            ref={modalRef}
                        >
                            <div className="bg-white  text-gray-900 border-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-700 border-0 rounded-lg shadow-lg relative flex flex-col w-full outline-none">
                                <div className="relative p-4 flex-auto">
                                    <div className="flex items-start justify-start p-2 space-x-4">
                                        <div className="flex-shrink-0 w-12">

                                            <span className="h-10 w-10 bg-green-100 text-white flex items-center justify-center rounded-full text-lg font-display font-bold">
                                                <FiCheck
                                                    size={18}
                                                    className="stroke-current text-green-500"
                                                />
                                            </span>

                                        </div>
                                        <div className="w-full">
                                            <div className=" mb-2 font-bold">

                                                <span className="mb-2">Submit Successful!</span>
                                            </div>
                                            <ul>
                                                <li>
                                                    <span className="font-bold">*</span> Acknowledgment evidence will be sent via email within 48 working hrs
                                                </li>
                                                <li>
                                                    <span className="font-bold">*</span> A notification will be sent to you upon approval of your uploaded documents
                                                </li>
                                            </ul>

                                            <div className="overflow-auto max-h-64">

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-end p-4 border-t border-gray-200 dark:border-gray-700 border-solid rounded-b space-x-2">
                                    <button
                                        className="btn btn-default btn-rounded bg-white hover:bg-gray-100 text-gray-900"
                                        type="button"
                                        onClick={hide}
                                    >
                                        Ok
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}


            <div className="flex justify-center flex-col lg:flex-row lg:flex-wrap w-full lg:space-x-4">
                <div className="w-full lg:w-1/12">
                    <p className="font-bold">Year <span>{year}</span></p>
                </div>
            </div>
            <h6 className="p-2 font-bold">Correspondence</h6>
            <p className="flex justify-center">Documents should not exceed 100kb</p>
            <Widget>
                <div>
                    <form onSubmit={handleSubmit(onSubmit)}>

                        <div className="flex justify-between mb-5">
                            <p>Cover letter for the submission of annual returns <small>(pdf, jpg, png)</small> </p>
                            <input
                                type="file"
                                className="hidden"
                                id='customFile'
                                onChange={onChange}
                                onClick={(e) => (e.target.value = null)}
                            />

                            <div className="flex justify-evenly">

                                <p >{file ? file.name : ""}</p>
                                <label
                                    htmlFor='customFile'
                                    style={{ backgroundColor: "#84abeb" }}
                                    className="btn btn-default text-white btn-outlined bg-transparent rounded-md mx-2"
                                >
                                    Select File
                                </label>

                                <button
                                    style={{ backgroundColor: "#84abeb" }}
                                    className="btn btn-default text-white btn-outlined bg-transparent rounded-md mx-2"
                                    type="submit"
                                    disabled={disabled}
                                >
                                    Submit
                                </button>
                                {submitting ?
                                    <div className='mb-2 w-24'>
                                        <Progress percentage={uploadPercentage} />
                                    </div>
                                    : ''}

                                {uploadedFile ? (
                                    <span className="h-10 w-10 bg-green-100 text-white flex items-center justify-center rounded-full text-lg font-display font-bold">
                                        <FiCheck
                                            size={18}
                                            className="stroke-current text-green-500"
                                        />
                                    </span>) : null}

                            </div>
                        </div>
                    </form>

                    {/* <hr className="mb-2" />

          <form onSubmit={handleSubmit(onSubmit2)}>
            <div className="flex justify-between mb-5">
              <p>Copy of letter mandating employees to file individual tax returns  <small>(pdf, jpg, png)</small></p>
              <input
                type="file"
                className="hidden"
                id='customFile2'
                onChange={onChange2}
                onClick={(e) => (e.target.value = null)}
              />

              <div className="flex justify-evenly">

                <p >{file2 ? file2.name : ""}</p>

                <label
                  htmlFor='customFile2'
                  style={{ backgroundColor: "#84abeb" }}
                  className="btn btn-default text-white btn-outlined bg-transparent rounded-md mx-2"
                >
                  Select File
                </label>

                <button
                  style={{ backgroundColor: "#84abeb" }}
                  className="btn btn-default text-white btn-outlined bg-transparent rounded-md mx-2"
                  type="submit"
                  disabled={disabled2}
                >
                  Submit
                </button>

                {submitting2 ?
                  <div className='mb-2 w-24'>
                    <Progress percentage={uploadPercentage2} />
                  </div>
                  : ''}

                {uploadedFile2 ? (
                  <span className="h-10 w-10 bg-green-100 text-white flex items-center justify-center rounded-full text-lg font-display font-bold">
                    <FiCheck
                      size={18}
                      className="stroke-current text-green-500"
                    />
                  </span>) : null}

              </div>
            </div>
          </form> */}

                    <hr className="mb-2" />

                    <form onSubmit={handleSubmit(onSubmit3)}>
                        <div className="flex justify-between mb-5">
                            <p>Letter of expatriate quota <small>[where applicable]</small> <small>(pdf, jpg, png)</small> </p>
                            <input
                                type="file"
                                className="hidden"
                                id='customFile3'
                                onChange={onChange3}
                                onClick={(e) => (e.target.value = null)}
                            />

                            <div className="flex justify-evenly">

                                <p >{file3 ? file3.name : ""}</p>

                                <label
                                    htmlFor='customFile3'
                                    style={{ backgroundColor: "#84abeb" }}
                                    className="btn btn-default text-white btn-outlined bg-transparent rounded-md mx-2"
                                >
                                    Select File
                                </label>

                                <button
                                    style={{ backgroundColor: "#84abeb" }}
                                    className="btn btn-default text-white btn-outlined bg-transparent rounded-md mx-2"
                                    type="submit"
                                    disabled={disabled3}
                                >
                                    Submit
                                </button>

                                {submitting3 ?
                                    <div className='mb-2 w-24'>
                                        <Progress percentage={uploadPercentage3} />
                                    </div>
                                    : ''}

                                {uploadedFile3 ? (
                                    <span className="h-10 w-10 bg-green-100 text-white flex items-center justify-center rounded-full text-lg font-display font-bold">
                                        <FiCheck
                                            size={18}
                                            className="stroke-current text-green-500"
                                        />
                                    </span>) : null}

                            </div>
                        </div>
                    </form>


                </div>
            </Widget>

            <div className="mt-12">
                <h6 className="p-2 font-bold">Employee Schedule</h6>
            </div>

            <Widget>
                <div>
                    <form onSubmit={handleSubmit(onSubmit4)}>
                        <div className="flex justify-between mb-5">
                            <p>Monthly payroll schedule <small>(excel/CSV)</small> </p>
                            <input
                                required
                                type="file"
                                className="hidden"
                                id='customFile4'
                                onChange={onChange4}
                                onClick={(e) => (e.target.value = null)}

                            />
                            <div className="flex items-center">

                                <p>{file4 ? file4.name : ""}</p>
                                <label
                                    htmlFor='customFile4'
                                    style={{ backgroundColor: "#84abeb" }}
                                    className="btn btn-default text-white btn-outlined bg-transparent rounded-md mx-2"

                                >
                                    select file
                                </label>

                                <button
                                    style={{ backgroundColor: "#84abeb" }}
                                    className="btn btn-default text-white btn-outlined bg-transparent rounded-md mx-2"
                                    type="submit"
                                    disabled={disabled4}
                                >
                                    Submit
                                </button>

                                {submitting4 ?
                                    <div className='mb-2 w-24'>
                                        <Progress percentage={uploadPercentage4} />
                                    </div>
                                    : ''}

                                {uploadedFile4 ? (
                                    <span className="h-10 w-10 bg-green-100 text-white flex items-center justify-center rounded-full text-lg font-display font-bold">
                                        <FiCheck
                                            size={18}
                                            className="stroke-current text-green-500"
                                        />
                                    </span>) : null}
                            </div>
                        </div>
                    </form>

                    <hr className="mb-2" />

                    <form onSubmit={handleSubmit(onSubmit5)}>
                        <div className="flex justify-between mb-5">
                            <p>Evidence of PAYE remittance  <small>(pdf, jpg, png)</small></p>


                            <input
                                id="customFile5"
                                type="file"
                                className="hidden"
                                onChange={onChange5}
                                onClick={(e) => (e.target.value = null)}
                            />
                            <div className="flex items-center">

                                <p>{file5 ? file5.name : ""}</p>

                                <label
                                    htmlFor='customFile5'
                                    style={{ backgroundColor: "#84abeb" }}
                                    className="btn btn-default text-white rounded-md btn-outlined bg-transparent mx-2"
                                >
                                    select file
                                </label>

                                <button
                                    style={{ backgroundColor: "#84abeb" }}
                                    className="btn btn-default text-white btn-outlined bg-transparent rounded-md mx-2"
                                    type="submit"
                                    disabled={disabled5}
                                >
                                    Submit
                                </button>

                                {submitting5 ?
                                    <div className='mb-2 w-24'>
                                        <Progress percentage={uploadPercentage5} />
                                    </div>
                                    : ''}

                                {uploadedFile5 ? (
                                    <span className="h-10 w-10 bg-green-100 text-white flex items-center justify-center rounded-full text-lg font-display font-bold">
                                        <FiCheck
                                            size={18}
                                            className="stroke-current text-green-500"
                                        />
                                    </span>) : null}

                            </div>
                        </div>
                    </form>

                    <hr className="mb-2" />

                    <form onSubmit={handleSubmit(onSubmit6)}>
                        <div className="flex justify-between mb-5">
                            <p>List of exit staff  <small>(pdf, word, excel/CSV)</small> </p>
                            <input
                                id="customFile6"
                                type="file"
                                className="hidden"
                                onChange={onChange6}
                                onClick={(e) => (e.target.value = null)}
                            />
                            <div className="flex items-center">

                                <p>{file6 ? file6.name : ""}</p>

                                <label
                                    htmlFor='customFile6'
                                    style={{ backgroundColor: "#84abeb" }}
                                    className="btn btn-default text-white rounded-md btn-outlined bg-transparent mx-2"
                                >
                                    select file
                                </label>

                                <button
                                    style={{ backgroundColor: "#84abeb" }}
                                    className="btn btn-default text-white btn-outlined bg-transparent rounded-md mx-2"
                                    type="submit"
                                    disabled={disabled6}
                                >
                                    Submit
                                </button>

                                {submitting6 ?
                                    <div className='mb-2 w-24'>
                                        <Progress percentage={uploadPercentage6} />
                                    </div>
                                    : ''}

                                {uploadedFile6 ? (
                                    <span className="h-10 w-10 bg-green-100 text-white flex items-center justify-center rounded-full text-lg font-display font-bold">
                                        <FiCheck
                                            size={18}
                                            className="stroke-current text-green-500"
                                        />
                                    </span>) : null}

                            </div>
                        </div>
                    </form>
                    <hr className="mb-2" />

                    {/* <form onSubmit={handleSubmit(onSubmit7)}>
            <div className="flex justify-between mb-5">
              <p>End of year trial balance </p>
              <input
                id="customFile7"
                type="file"
                className="hidden"
                onChange={onChange7}
                onClick={(e) => (e.target.value = null)}
              />
              <div className="flex items-center">

                <p>{file7 ? file7.name : ""}</p>

                <label
                  htmlFor='customFile7'
                  style={{ backgroundColor: "#84abeb" }}
                  className="btn btn-default text-white rounded-md btn-outlined bg-transparent mx-2"
                >
                  select file
                </label>

                <button
                  style={{ backgroundColor: "#84abeb" }}
                  className="btn btn-default text-white btn-outlined bg-transparent rounded-md mx-2"
                  type="submit"
                  disabled={disabled7}
                >
                  Submit
                </button>

                {submitting7 ?
                  <div className='mb-2 w-24'>
                    <Progress percentage={uploadPercentage7} />
                  </div>
                  : ''}

                {uploadedFile7 ? (
                  <span className="h-10 w-10 bg-green-100 text-white flex items-center justify-center rounded-full text-lg font-display font-bold">
                    <FiCheck
                      size={18}
                      className="stroke-current text-green-500"
                    />
                  </span>) : null}

              </div>
            </div>
          </form> */}
                </div>
            </Widget>

            <div className="mt-12">
                <h6 className="p-2 font-bold">Remittance</h6>
            </div>


            <Widget>
                <form onSubmit={handleSubmit(onSubmit8)}>
                    <div className="flex justify-between mb-5">
                        <p>Schedule of withholding tax deductions  <small> (excel, pdf)</small><br /><span className="flex justify-end" style={{ color: "teal" }}></span></p>
                        <input
                            id="customFile8"
                            type="file"
                            className="hidden"
                            onChange={onChange8}
                            onClick={(e) => (e.target.value = null)}
                        />
                        <div className="flex items-center">

                            <p>{file8 ? file8.name : ""}</p>

                            <label
                                htmlFor='customFile8'
                                style={{ backgroundColor: "#84abeb" }}
                                className="btn btn-default text-white rounded-md btn-outlined bg-transparent mx-2"
                            >
                                select file
                            </label>

                            <button
                                style={{ backgroundColor: "#84abeb" }}
                                className="btn btn-default text-white btn-outlined bg-transparent rounded-md mx-2"
                                type="submit"
                                disabled={disabled8}
                            >
                                Submit
                            </button>

                            {submitting8 ?
                                <div className='mb-2 w-24'>
                                    <Progress percentage={uploadPercentage8} />
                                </div>
                                : ''}

                            {uploadedFile8 ? (
                                <span className="h-10 w-10 bg-green-100 text-white flex items-center justify-center rounded-full text-lg font-display font-bold">
                                    <FiCheck
                                        size={18}
                                        className="stroke-current text-green-500"
                                    />
                                </span>) : null}

                        </div>
                    </div>
                </form>

                <hr className="mb-2" />


                <form onSubmit={handleSubmit(onSubmit9)}>
                    <div className="flex justify-between mb-5">
                        <p>Withholding tax receipts (corporate & Individual)  <small>(pdf, jpg, png)</small></p>
                        <input
                            id="customFile9"
                            type="file"
                            className="hidden"
                            onChange={onChange9}
                            onClick={(e) => (e.target.value = null)}
                        />
                        <div className="flex items-center">

                            <p>{file9 ? file9.name : ""}</p>

                            <label
                                htmlFor='customFile9'
                                style={{ backgroundColor: "#84abeb" }}
                                className="btn btn-default text-white rounded-md btn-outlined bg-transparent mx-2"
                            >
                                select file
                            </label>

                            <button
                                style={{ backgroundColor: "#84abeb" }}
                                className="btn btn-default text-white btn-outlined bg-transparent rounded-md mx-2"
                                type="submit"
                                disabled={disabled9}
                            >
                                Submit
                            </button>

                            {submitting9 ?
                                <div className='mb-2 w-24'>
                                    <Progress percentage={uploadPercentage9} />
                                </div>
                                : ''}

                            {uploadedFile9 ? (
                                <span className="h-10 w-10 bg-green-100 text-white flex items-center justify-center rounded-full text-lg font-display font-bold">
                                    <FiCheck
                                        size={18}
                                        className="stroke-current text-green-500"
                                    />
                                </span>) : null}

                        </div>
                    </div>
                </form>
                <hr className="mb-2" />

                <form onSubmit={handleSubmit(onSubmit10)}>
                    <div className="flex justify-between mb-5">
                        <p>Monthly Immigration returns  <small>(pdf, jpg, png)</small></p>
                        <input
                            id="customFile10"
                            type="file"
                            className="hidden"
                            onChange={onChange10}
                            onClick={(e) => (e.target.value = null)}
                        />
                        <div className="flex items-center">

                            <p>{file10 ? file10.name : ""}</p>

                            <label
                                htmlFor='customFile10'
                                style={{ backgroundColor: "#84abeb" }}
                                className="btn btn-default text-white rounded-md btn-outlined bg-transparent mx-2"
                            >
                                select file
                            </label>

                            <button
                                style={{ backgroundColor: "#84abeb" }}
                                className="btn btn-default text-white btn-outlined bg-transparent rounded-md mx-2"
                                type="submit"
                                disabled={disabled10}
                            >
                                Submit
                            </button>

                            {submitting10 ?
                                <div className='mb-2 w-24'>
                                    <Progress percentage={uploadPercentage10} />
                                </div>
                                : ''}

                            {uploadedFile10 ? (
                                <span className="h-10 w-10 bg-green-100 text-white flex items-center justify-center rounded-full text-lg font-display font-bold">
                                    <FiCheck
                                        size={18}
                                        className="stroke-current text-green-500"
                                    />
                                </span>) : null}

                        </div>
                    </div>
                </form>
                <hr className="mb-2" />
            </Widget>

            <div className="mt-12">
                <h6 className="p-2 font-bold">Contributions and Levies</h6>
            </div>

            <Widget>
                <form onSubmit={handleSubmit(onSubmit11)}>
                    <div className="flex justify-between mb-5">
                        <p>Development levy receipts (corporate & Individual)   <small> (jpg, pdf, png)</small><br /><span className="flex justify-end" style={{ color: "teal" }}></span></p>
                        <input
                            id="customFile11"
                            type="file"
                            className="hidden"
                            onChange={onChange11}
                            onClick={(e) => (e.target.value = null)}
                        />
                        <div className="flex items-center">

                            <p>{file11 ? file11.name : ""}</p>

                            <label
                                htmlFor='customFile11'
                                style={{ backgroundColor: "#84abeb" }}
                                className="btn btn-default text-white rounded-md btn-outlined bg-transparent mx-2"
                            >
                                select file
                            </label>

                            <button
                                style={{ backgroundColor: "#84abeb" }}
                                className="btn btn-default text-white btn-outlined bg-transparent rounded-md mx-2"
                                type="submit"
                                disabled={disabled11}
                            >
                                Submit
                            </button>

                            {submitting11 ?
                                <div className='mb-2 w-24'>
                                    <Progress percentage={uploadPercentage11} />
                                </div>
                                : ''}

                            {uploadedFile11 ? (
                                <span className="h-10 w-10 bg-green-100 text-white flex items-center justify-center rounded-full text-lg font-display font-bold">
                                    <FiCheck
                                        size={18}
                                        className="stroke-current text-green-500"
                                    />
                                </span>) : null}

                        </div>
                    </div>
                </form>

                <hr className="mb-2" />


                <form onSubmit={handleSubmit(onSubmit12)}>
                    <div className="flex justify-between mb-5">
                        <p>Business premises receipts (corporate & Individual)  <small>(pdf, jpg, png)</small></p>
                        <input
                            id="customFile12"
                            type="file"
                            className="hidden"
                            onChange={onChange12}
                            onClick={(e) => (e.target.value = null)}
                        />
                        <div className="flex items-center">

                            <p>{file12 ? file12.name : ""}</p>

                            <label
                                htmlFor='customFile12'
                                style={{ backgroundColor: "#84abeb" }}
                                className="btn btn-default text-white rounded-md btn-outlined bg-transparent mx-2"
                            >
                                select file
                            </label>

                            <button
                                style={{ backgroundColor: "#84abeb" }}
                                className="btn btn-default text-white btn-outlined bg-transparent rounded-md mx-2"
                                type="submit"
                                disabled={disabled12}
                            >
                                Submit
                            </button>

                            {submitting12 ?
                                <div className='mb-2 w-24'>
                                    <Progress percentage={uploadPercentage12} />
                                </div>
                                : ''}

                            {uploadedFile12 ? (
                                <span className="h-10 w-10 bg-green-100 text-white flex items-center justify-center rounded-full text-lg font-display font-bold">
                                    <FiCheck
                                        size={18}
                                        className="stroke-current text-green-500"
                                    />
                                </span>) : null}

                        </div>
                    </div>
                </form>

                <hr className="mb-2" />

                <form onSubmit={handleSubmit(onSubmit13)}>
                    <div className="flex justify-between mb-5">
                        <p>Ground rent receipts (corporate & Individual)   <small>(pdf, jpg, png)</small></p>
                        <input
                            id="customFile13"
                            type="file"
                            className="hidden"
                            onChange={onChange13}
                            onClick={(e) => (e.target.value = null)}
                        />
                        <div className="flex items-center">

                            <p>{file13 ? file13.name : ""}</p>

                            <label
                                htmlFor='customFile13'
                                style={{ backgroundColor: "#84abeb" }}
                                className="btn btn-default text-white rounded-md btn-outlined bg-transparent mx-2"
                            >
                                select file
                            </label>

                            <button
                                style={{ backgroundColor: "#84abeb" }}
                                className="btn btn-default text-white btn-outlined bg-transparent rounded-md mx-2"
                                type="submit"
                                disabled={disabled13}
                            >
                                Submit
                            </button>

                            {submitting13 ?
                                <div className='mb-2 w-24'>
                                    <Progress percentage={uploadPercentage13} />
                                </div>
                                : ''}

                            {uploadedFile13 ? (
                                <span className="h-10 w-10 bg-green-100 text-white flex items-center justify-center rounded-full text-lg font-display font-bold">
                                    <FiCheck
                                        size={18}
                                        className="stroke-current text-green-500"
                                    />
                                </span>) : null}

                        </div>
                    </div>
                </form>

                <hr className="mb-2" />

                <form onSubmit={handleSubmit(onSubmit14)}>
                    <div className="flex justify-between mb-5">
                        <p>Social service contributions levy (SSCL) (corporate & Individual)   <small>(pdf, jpg, png)</small></p>
                        <input
                            id="customFile14"
                            type="file"
                            className="hidden"
                            onChange={onChange14}
                            onClick={(e) => (e.target.value = null)}
                        />
                        <div className="flex items-center">

                            <p>{file14 ? file14.name : ""}</p>

                            <label
                                htmlFor='customFile14'
                                style={{ backgroundColor: "#84abeb" }}
                                className="btn btn-default text-white rounded-md btn-outlined bg-transparent mx-2"
                            >
                                select file
                            </label>

                            <button
                                style={{ backgroundColor: "#84abeb" }}
                                className="btn btn-default text-white btn-outlined bg-transparent rounded-md mx-2"
                                type="submit"
                                disabled={disabled14}
                            >
                                Submit
                            </button>

                            {submitting14 ?
                                <div className='mb-2 w-24'>
                                    <Progress percentage={uploadPercentage14} />
                                </div>
                                : ''}

                            {uploadedFile14 ? (
                                <span className="h-10 w-10 bg-green-100 text-white flex items-center justify-center rounded-full text-lg font-display font-bold">
                                    <FiCheck
                                        size={18}
                                        className="stroke-current text-green-500"
                                    />
                                </span>) : null}

                        </div>
                    </div>
                </form>
            </Widget>

            <div className="mt-12"><h6 className="p-2 font-bold">Deductions</h6></div>

            <Widget>
                <form onSubmit={handleSubmit(onSubmit15)}>
                    <div className="flex justify-between mb-5">
                        <p>Evidence of remittance of pension  <small>(pdf, jpg, png)</small></p>
                        <input
                            id="customFile15"
                            type="file"
                            className="hidden"
                            onChange={onChange15}
                            onClick={(e) => (e.target.value = null)}
                        />
                        <div className="flex items-center">

                            <p>{file15 ? file15.name : ""}</p>

                            <label
                                htmlFor='customFile15'
                                style={{ backgroundColor: "#84abeb" }}
                                className="btn btn-default text-white rounded-md btn-outlined bg-transparent mx-2"
                            >
                                select file
                            </label>

                            <button
                                style={{ backgroundColor: "#84abeb" }}
                                className="btn btn-default text-white btn-outlined bg-transparent rounded-md mx-2"
                                type="submit"
                                disabled={disabled15}
                            >
                                Submit
                            </button>

                            {submitting15 ?
                                <div className='mb-2 w-24'>
                                    <Progress percentage={uploadPercentage15} />
                                </div>
                                : ''}

                            {uploadedFile15 ? (
                                <span className="h-10 w-10 bg-green-100 text-white flex items-center justify-center rounded-full text-lg font-display font-bold">
                                    <FiCheck
                                        size={18}
                                        className="stroke-current text-green-500"
                                    />
                                </span>) : null}

                        </div>
                    </div>
                </form>

                <hr className="mb-2" />

                <form onSubmit={handleSubmit(onSubmit16)}>
                    <div className="flex justify-between mb-5">
                        <p>Evidence of remittance of NHF  <small>(pdf, jpg, png)</small></p>
                        <input
                            id="customFile16"
                            type="file"
                            className="hidden"
                            onChange={onChange16}
                            onClick={(e) => (e.target.value = null)}
                        />
                        <div className="flex items-center">

                            <p>{file16 ? file16.name : ""}</p>

                            <label
                                htmlFor='customFile16'
                                style={{ backgroundColor: "#84abeb" }}
                                className="btn btn-default text-white rounded-md btn-outlined bg-transparent mx-2"
                            >
                                select file
                            </label>

                            <button
                                style={{ backgroundColor: "#84abeb" }}
                                className="btn btn-default text-white btn-outlined bg-transparent rounded-md mx-2"
                                type="submit"
                                disabled={disabled16}
                            >
                                Submit
                            </button>

                            {submitting16 ?
                                <div className='mb-2 w-24'>
                                    <Progress percentage={uploadPercentage16} />
                                </div>
                                : ''}

                            {uploadedFile16 ? (
                                <span className="h-10 w-10 bg-green-100 text-white flex items-center justify-center rounded-full text-lg font-display font-bold">
                                    <FiCheck
                                        size={18}
                                        className="stroke-current text-green-500"
                                    />
                                </span>) : null}

                        </div>
                    </div>
                </form>

                <hr className="mb-2" />

                <form onSubmit={handleSubmit(onSubmit17)}>
                    <div className="flex justify-between mb-5">
                        <p>Evidence of remittance of NHIS   <small>(pdf, jpg, png)</small></p>
                        <input
                            id="customFile17"
                            type="file"
                            className="hidden"
                            onChange={onChange17}
                            onClick={(e) => (e.target.value = null)}
                        />
                        <div className="flex items-center">

                            <p>{file17 ? file17.name : ""}</p>

                            <label
                                htmlFor='customFile17'
                                style={{ backgroundColor: "#84abeb" }}
                                className="btn btn-default text-white rounded-md btn-outlined bg-transparent mx-2"
                            >
                                select file
                            </label>

                            <button
                                style={{ backgroundColor: "#84abeb" }}
                                className="btn btn-default text-white btn-outlined bg-transparent rounded-md mx-2"
                                type="submit"
                                disabled={disabled17}
                            >
                                Submit
                            </button>

                            {submitting17 ?
                                <div className='mb-2 w-24'>
                                    <Progress percentage={uploadPercentage17} />
                                </div>
                                : ''}

                            {uploadedFile17 ? (
                                <span className="h-10 w-10 bg-green-100 text-white flex items-center justify-center rounded-full text-lg font-display font-bold">
                                    <FiCheck
                                        size={18}
                                        className="stroke-current text-green-500"
                                    />
                                </span>) : null}

                        </div>
                    </div>
                </form>

                <hr className="mb-2" />

                <form onSubmit={handleSubmit(onSubmit18)}>
                    <div className="flex justify-between mb-5">
                        <p>Evidence of remittance of LAP   <small>(pdf, jpg, png)</small></p>
                        <input
                            id="customFile18"
                            type="file"
                            className="hidden"
                            onChange={onChange18}
                            onClick={(e) => (e.target.value = null)}
                        />
                        <div className="flex items-center">

                            <p>{file18 ? file18.name : ""}</p>

                            <label
                                htmlFor='customFile18'
                                style={{ backgroundColor: "#84abeb" }}
                                className="btn btn-default text-white rounded-md btn-outlined bg-transparent mx-2"
                            >
                                select file
                            </label>

                            <button
                                style={{ backgroundColor: "#84abeb" }}
                                className="btn btn-default text-white btn-outlined bg-transparent rounded-md mx-2"
                                type="submit"
                                disabled={disabled18}
                            >
                                Submit
                            </button>

                            {submitting18 ?
                                <div className='mb-2 w-24'>
                                    <Progress percentage={uploadPercentage18} />
                                </div>
                                : ''}

                            {uploadedFile18 ? (
                                <span className="h-10 w-10 bg-green-100 text-white flex items-center justify-center rounded-full text-lg font-display font-bold">
                                    <FiCheck
                                        size={18}
                                        className="stroke-current text-green-500"
                                    />
                                </span>) : null}

                        </div>
                    </div>
                </form>
                <div className="flex justify-center">
                    <button
                        className="disabled:opacity-50 bg-green-500 py-2 px-6 rounded-md  text-white border hover:text-white hover:bg-white-500 hover:border-green-500"
                        type="submit"
                        onClick={() => handleSubmit(SubmitUploads)()}
                    >
                        Submit
                    </button>
                </div>
            </Widget>

        </>
    );
};

export default AnnualSupDocs;
