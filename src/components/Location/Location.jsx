import Button from "../Button/Button"
import CollegeContainer from "../Container/CollegeContainer"
import WhatsappSvg from "../SVG/WhatsappSvg"

const schools =[{
    name: 'SANJEEVANI GLOBAL ACADEMY , Bhaurasa',
    location: 'BHAWARASALA , BEHIND ARVINDO REVATI, Sanwer Rd, Bhaurasa, Madhya Pradesh 453555',
    img: 'https://content.jdmagicbox.com/comp/delhi/z1/011pxx11.xx11.200122132514.v3z1/catalogue/global-pratibha-international-school-dwarka-sector-8-delhi-schools-1t0d4ucxsp.jpg?clr=',
    contact: '9080000',
    link: '',
    grades: 'Nursery - Grade XII',
    fees:'1200-5000/- Per Month',
    timing: '8:30 AM to 3:30 PM',
    estaDate: '1999',
    whatsappDeepLink:''
},
{
    name: 'SANJEEVANI GLOBAL ACADEMY , Bhaurasa',
    location: 'BHAWARASALA , BEHIND ARVINDO REVATI, Sanwer Rd, Bhaurasa, Madhya Pradesh 453555',
    img: 'https://content.jdmagicbox.com/comp/delhi/z1/011pxx11.xx11.200122132514.v3z1/catalogue/global-pratibha-international-school-dwarka-sector-8-delhi-schools-1t0d4ucxsp.jpg?clr=',
    contact: '9080000',
    link: '',
    grades: 'Nursery - Grade XII',
    fees:'1200-5000/- Per Month',
    timing: '8:30 AM to 3:30 PM',
    estaDate: '1999',
    whatsappDeepLink:''
},
{
    name: 'SANJEEVANI GLOBAL ACADEMY , BHAURASA',
    location: 'BHAWARASALA , BEHIND ARVINDO REVATI, Sanwer Rd, Bhaurasa, Madhya Pradesh 453555',
    img: 'https://content.jdmagicbox.com/comp/delhi/z1/011pxx11.xx11.200122132514.v3z1/catalogue/global-pratibha-international-school-dwarka-sector-8-delhi-schools-1t0d4ucxsp.jpg?clr=',
    contact: '9080000',
    link: '',
    grades: 'Nursery - Grade XII',
    fees:'1200-5000/- Per Month',
    timing: '8:30 AM to 3:30 PM',
    estaDate: '1999',
    whatsappDeepLink:''
},
{
    name: 'SANJEEVANI GLOBAL ACADEMY , BAGLI',
    location: 'BHAWARASALA , BEHIND ARVINDO REVATI, Sanwer Rd, Bhaurasa, Madhya Pradesh 453555',
    img: 'https://content.jdmagicbox.com/comp/delhi/z1/011pxx11.xx11.200122132514.v3z1/catalogue/global-pratibha-international-school-dwarka-sector-8-delhi-schools-1t0d4ucxsp.jpg?clr=',
    contact: '9080000',
    link: '',
    grades: 'Nursery - Grade XII',
    fees:'1200-5000/- Per Month',
    timing: '8:30 AM to 3:30 PM',
    estaDate: '1999',
    whatsappDeepLink:''
},
{
    name: 'SANJEEVANI GLOBAL ACADEMY , SONKATCH',
    location: 'BHAWARASALA , BEHIND ARVINDO REVATI, Sanwer Rd, Bhaurasa, Madhya Pradesh 453555',
    img: 'https://content.jdmagicbox.com/comp/delhi/z1/011pxx11.xx11.200122132514.v3z1/catalogue/global-pratibha-international-school-dwarka-sector-8-delhi-schools-1t0d4ucxsp.jpg?clr=',
    contact: '9080000',
    link: '',
    grades: 'Nursery - Grade XII',
    fees:'1200-5000/- Per Month',
    timing: '8:30 AM to 3:30 PM',
    estaDate: '1999',
    whatsappDeepLink:''
},
{
    name: 'SANJEEVANI GLOBAL ACADEMY , GWALIOR',
    location: 'BHAWARASALA , BEHIND ARVINDO REVATI, Sanwer Rd, Bhaurasa, Madhya Pradesh 453555',
    img: 'https://content.jdmagicbox.com/comp/delhi/z1/011pxx11.xx11.200122132514.v3z1/catalogue/global-pratibha-international-school-dwarka-sector-8-delhi-schools-1t0d4ucxsp.jpg?clr=',
    contact: '9080000',
    link: '',
    grades: 'Nursery - Grade XII',
    fees:'1200-5000/- Per Month',
    timing: '8:30 AM to 3:30 PM',
    estaDate: '1999',
    whatsappDeepLink:''
}
]

const LocationView = () => {
    return (
        <>
            <div className="container my-24 mx-auto md:px-6">
                <section className="mb-32 text-center md:text-left">
                    <h2 className="mb-12 text-center text-3xl font-bold">We are in your Neighbourhood
                        Locate your Campus</h2>
                    { schools.map((school,index)=>(
                    <CollegeContainer school={school} index={index+1} order={'md:order-2'}/>
                 ))}
                </section>
            </div>
        </>
    )
}

export default LocationView