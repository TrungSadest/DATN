export default function BuyComponent() {
    return (
        <>

            <div className="owl-item active" style={{ width: '290.25px', marginRight: '45px' }}>
                <div className="pb-5">
                    <div className="product-item position-relative bg-light d-flex flex-column text-center">
                        <img className="img-fluid mb-4" src="/assets/img/house-2.png" alt="" />
                        <h6 className="text-uppercase">Quality Pet Foods</h6>
                        <h5 className="text-primary mb-0">$199.00</h5>
                        <div className="btn-action d-flex justify-content-center">
                            <a className="btn btn-primary py-2 px-3" href=""><i className="bi bi-cart"></i></a>
                            <a className="btn btn-primary py-2 px-3" href=""><i className="bi bi-eye"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}