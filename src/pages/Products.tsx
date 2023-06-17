import Breadcrumb from '../components/Breadcrumb';
import DecideAddOtherProductAbout from '../components/DecideAddOtherProductAbout';
import { ModalPostOtherProduct, ModalPostProduct } from '../components/Modals';
import { Toaster, toast } from "react-hot-toast";
import TableOne from '../components/TableOne';
import TableThree from '../components/TableThree';
import TableTwo from '../components/TableTwo';
import DefaultLayout from '../layout/DefaultLayout';
import { RootState, useAppDispatch, useAppSelector } from '../store';
import FormPostProduct from "./Form/FormPostProduct"
import { useEffect } from 'react';
import { clearStateToast } from '../store/reducers/modalReducer';

const Products = () => {
  const postProductModalisActive = useAppSelector((state: RootState) => state.modals.postProductModalisActive)
  const postAddOtherProductModalisActive = useAppSelector((state: RootState) => state.modals.postAddOtherProductModalisActive)
  const toastModal = useAppSelector((state: RootState) => state.modals.toastModal)
  const dispatch = useAppDispatch()

  useEffect(() => {
    console.log("products");
    
    if (toastModal.isActive) {
      if (toastModal.type == "success") {
        console.log("success");

        toast.success(toastModal.message, {
          duration: 4000,
        });

        setTimeout(() => {
          dispatch(clearStateToast())
        }, 10000);
      } else {
        console.log("errpr");
        toast.error(toastModal.message, {
          duration: 6000,
        });
        setTimeout(() => {
          dispatch(clearStateToast())
        }, 10000);
      }
    }
  }, [toastModal.isActive])

  return (
    <div>
      {toastModal.isActive && <Toaster position="top-center" toastOptions={
        {
          style: {
            fontWeight: 'bold'
          }
        }
      } />}
      <div className={postProductModalisActive ? "block" : "hidden"}>
        <ModalPostProduct>
          <FormPostProduct />
        </ModalPostProduct>
      </div>
      {/* <div className={postAddOtherProductModalisActive ? "block" : "hidden"}>
        <ModalPostOtherProduct>
          <DecideAddOtherProductAbout />
        </ModalPostOtherProduct>
      </div> */}
      <DefaultLayout>
        <Breadcrumb pageName="Products" />
        <div className="flex flex-col gap-10 relative">
          <TableTwo />
          {/* <TableOne />
          <TableThree /> */}
        </div>
      </DefaultLayout>

    </div>

  );
};

export default Products;
