import React, { useEffect, useState } from 'react'
import { CategoryModel } from '../../model/CategoryModel';
import { BrandModel } from '../../model/BrandModel';
import { PublicService } from '../../services/PublicService';

export default function SideBarProduct() {
    const [categories, setCategories] = useState<CategoryModel[]>([]);
    const [brands, setBrands] = useState<BrandModel[]>([]);
    useEffect(() => {
        PublicService.getInstance().getListCategory()
            .then((res) => {
                setCategories(res.data.responseData);
            })
            .catch((e) => {
                console.log(e);
            });
        PublicService.getInstance().getListBrand()
            .then((res) => {
                setBrands(res.data.responseData);
            })
            .catch((e) => {
                console.log(e);
            });
    }, [])
    return (
        <>
            <div className="col-lg-3 sidebar">
                <div className="sidebar-widget brands">
                    <h2 className="title">Danh mục</h2>
                    <ul>
                        {categories.map((category) => (
                            <li key={category.categoryId}><a className='pointer'>{category.categoryName} </a><span>(45)</span></li>
                        ))}
                    </ul>
                </div>

                <div className="sidebar-widget brands">
                    <h2 className="title">Thương hiệu</h2>
                    <ul>
                        {brands.map((brand) => (
                            <li key={brand.brandId}><a className='pointer'>{brand.brandName} </a><span>(45)</span></li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    )
}
