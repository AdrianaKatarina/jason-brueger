import {
  Background,
  ModalSection,
  BtnClose,
  Check,
  Message,
} from "./Modal.styles";
import ContainerButtons from "../ContainerButtons/ContainerButtons";
import verified from "../../assets/verified.gif";
import warning from "../../assets/warning.gif";

const Modal = (props) => {
  if (props.isOpen) {
    const handleOutsideClick = (e) => {
      if (e.target.id === "modal") props.setModalOpen();
    };

    return (
      <Background id="modal" onClick={handleOutsideClick}>
        {props.typeModal === "confirmation" ? (
          <ModalSection>
            <BtnClose onClick={props.setModalOpen} />
            <Message>{props.message}</Message>
            <ContainerButtons
              variantContainer="center"
              variantBtnOne="septenary"
              variantBtnTwo="senary"
              onClickBtnOne={props.setModalOpen}
              onClickBtnTwo={props.send}
              childrenBtnTwo="Sim"
              childrenBtnOne="Cancelar"
            />
          </ModalSection>
        ) : (
          <ModalSection>
            <BtnClose onClick={props.setModalOpen} />
            {props.typeModal === "warning" ? (<Check src={warning} alt="Símbolo de alerta" />)
              : (<Check src={verified} alt="Marca de verificado com sucesso" />)}
            <Message>{props.message}</Message>
          </ModalSection>
        )}
      </Background>
    );
  }
  return null;
};

export default Modal;
