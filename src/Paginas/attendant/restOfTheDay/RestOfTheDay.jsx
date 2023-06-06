import { React, useState, useEffect } from 'react';
import Header from '../../../Components/header/Header';
import ContainerButtons from '../../../Components/containerButtons/ContainerButtons';
import List from '../../../Components/list/List';
import Select from '../../../Components/select/Select';
import Input from '../../../Components/input/Input';
import OrderResume from '../../../Components/orderResume/OrderResume';
import { Main, SectionMenu, TitleMenu, UlMenu } from './RestOfTheDay.styled';
import { getProducts } from '../../../API/products/products';
import { createOrder } from '../../../API/orders/orders';
import { useNavigate } from "react-router-dom";

const RestOfTheDay = () => {
  const [products, setProducts] = useState([]);
  const [orderItem, setOrderItem] = useState([]);
  const [selectValue, setSelectValue] = useState('');
  const [clientName, setName] = useState('');
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await getProducts(token);
       //console.log(response)
        
        if (!response.ok) {
          throw new Error(`Erro ao obter os produtos da API ${response.statusText}`);
        }
        
        const productsList = await response.json();
        setProducts(productsList)
      
      } 
      catch (error) {
        alert(error.message)
        console.log(error.message);
      };
    };
    fetchData();
  }, []);

  const navigation = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    navigation('/breakfast');
  };

  const handleClickDelete = (item) => {
    //tenho que saber o index, onde esta?
    //pega o objeto com o index desejado
    const getIndex = orderItem.findIndex((order) => order.id === item.id);
    //console.log('getIndex', getIndex);

    //pegar o resumo e fazer a copia antes da alteração no state
    const newOrder = [...orderItem];
    //console.log('newOrder', newOrder);

    //splice, primeiro localiza pelo index e o 1 quer dizer você quer modificar/remover
    newOrder.splice(getIndex, 1);
    //console.log('splice', newOrder);;

    //atualizar o estado do orderItem 
    setOrderItem(newOrder);
  }
    
  // fazer função do botão mais e menos;
  const handleClickQuantity = (item, children) => {
    //identificar o index para saber o item que quer aumentar/diminuir
    const getIndex = orderItem.findIndex((order) => order.id === item.id);
    //console.log('getIndex', getIndex);
    //fazer uma cópia
    const newOrder = [...orderItem];
    if(children === '-'){
      //caso ja seja 1 e queira diminuir, o item será removido
      if(item.quantity <= 1){
        handleClickDelete(item)
      }else{
        const specificItem = newOrder[getIndex];
        const valueChange = specificItem.quantity - 1;
        newOrder[getIndex].quantity = valueChange;
        setOrderItem(newOrder);
      }    
        
    }
    if(children === '+'){
      const specificItem = newOrder[getIndex];
      const quantityChange = specificItem.quantity + 1;
      newOrder[getIndex].quantity = quantityChange;
      setOrderItem(newOrder);
    }
  }

  const addItems = (product) => {
    if(orderItem.length === 0){
      return setOrderItem((prevState) => [...prevState, product])
    }
    const verification = orderItem.find(prod => prod.id === product.id);
    if(!verification){
      return setOrderItem((prevState) => [...prevState, product])
    }
    alert('item já está adicionado! Se quiser alterar a quantidade usar os botões do resumo do pedido')
  }

  const totalOrderAmount = () => {
    //reduce -> metodos de array
    //recebe 2 pararmetros, função callback e acumulador(amarzenador de infos)
    //função callback recebe dois parametros -> acumulador e valor atual
    //acumulador -> valores add nas interações
    //valor atual será o item atual pecorrido no array
    //sempre retornar o accumulador 

    return  orderItem.reduce((accum, valorAtual) => {
      return accum + (valorAtual.price * valorAtual.quantity);
    }, 0);
   }

  const handleSendOrder = async () => {
    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');
      //console.log(userId);
      
      //tratamento de erro para quando não enviar pedido sem nenhum pedido
      if(orderItem.length <= 0){
        throw new Error(`Não é possível enviar pedido caso o resumo esteja vazio!`);
      }
      if(clientName === ''){
        throw new Error(`Não é possível enviar pedido caso não digite o nome do cliente!`);
      }
      const response = await createOrder(orderItem, clientName, userId, token); 
      //console.log(response)
      const orderData = await response.json();
      console.log(orderData);
      alert('Pedido enviado com sucesso')
      //mensagem de enviado com sucesso com tempo(pode ser um modal)
      
    } 
    catch (error) {
      alert(error.message)
      console.log(error.message);
    };
  };

  return (
    <>
      <Header />
      <Main>
        <SectionMenu>
          <ContainerButtons bntBreakfast='terciary' btnRestOfTheDay='secundary' onClickBreakfast={handleClick}/>
          <Input 
          type='text'
          value={clientName}
          onChange={(e) => setName(e.target.value)}
          name='name'
          placeholder='Digite o nome do cliente'
        />
          <Select onChange={(e) => setSelectValue(e.target.value)}/>
          <TitleMenu>Hamburguers</TitleMenu>
          <UlMenu>
            {products.map((product) => {
              return product.type === 'Hamburguers' &&
              <List 
              key={product.id} 
              name={product.name} 
              price={`R$${product.price}`} 
              onClick={() => addItems(product)}
              />
            })}           
          </UlMenu>
          <TitleMenu>Acompanhamentos</TitleMenu>
          <UlMenu>
            {products.map((product) => {
              return product.type === 'Acompanhamentos' &&
              <List 
              key={product.id} 
              name={product.name} 
              price={`R$${product.price}`} 
              onClick={() => setOrderItem((prevState) => [...prevState, product])}
              />
            })}           
          </UlMenu>
          <TitleMenu>Bebidas</TitleMenu>
          <UlMenu>
            {products.map((product) => {
              return product.type === 'Bebidas' &&
              <List 
              key={product.id} 
              name={product.name} 
              price={`R$${product.price}`} 
              onClick={() => setOrderItem((prevState) => [...prevState, product])}
              />
            })}           
          </UlMenu>
        </SectionMenu>
        <OrderResume 
          orderItem={orderItem} 
          selectValue={selectValue}
          clientNameValue={clientName}
          onClickDelete={handleClickDelete} 
          onClickQuantity={handleClickQuantity}
          total={totalOrderAmount()}
          onClickSend={handleSendOrder}
        />
      </Main>
        
    </> 
  )
}

export default RestOfTheDay;