import React from 'react'
import { useFetch } from '../../Hooks/useFetch'
import SupplierCss from './Supplier.module.css';

export const Supplier = ({article_id}) => {

    const {response, isLoading} = useFetch(`http://localhost:8888/get-suppliers?article_id=${article_id}`);

    const GetSupplier = () => {

        if(response && !isLoading){
            let { res, result } = response;

            if(res === "1"){
                return (
                    <table className={SupplierCss.supplierTable}>
                        <tbody>
                            <tr >
                                <th className={SupplierCss.thSupplierValue}>Nombre</th>
                                <th className={SupplierCss.thSupplierValue}>CIF</th>
                                <th className={SupplierCss.thSupplierValue}>Dirección</th>
                            </tr> 
                            <tr className={SupplierCss.trSupplier}>
                                <td className={SupplierCss.tdSupplierValue}>{result[0].nombre}</td>
                                <td className={SupplierCss.tdSupplierValue}>{result[0].cif}</td>
                                <td className={SupplierCss.tdSupplierValue}>{result[0].direccion}</td>
                            </tr> 
                        </tbody>
                    </table>
                )

            }
        }
    }

    return (
        <>
           {!isLoading && GetSupplier()}
        </>
    )
}
