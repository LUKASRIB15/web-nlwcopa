import Image from 'next/image'
import banner from '../assets/banner.png'
import logoCopa from '../assets/logo.svg'
import avatares from '../assets/avatares.png'
import iconCheck from '../assets/icon.svg'
import { api } from '../lib/axios'
import {FormEvent, useState} from 'react'

interface HomeProps{
  poolCount: number;
  guessCount: number;
  userCount: number;
}
export default function Home(props:HomeProps) {
  const [poolTitle, setPoolTitle] = useState('')

  async function createPool(event: FormEvent){
    event.preventDefault()

    try{
        const response = await api.post('pools',{
        title: poolTitle,
      })

      const {code} = response.data

      navigator.clipboard.writeText(code)

      setPoolTitle('')

      alert('Bolão foi criado com sucesso, o código foi copiado para a área de transferência!')
    } catch(err){
        console.log(err)
        alert('Falhou ao criar o bolão')
    }

  }
  return (
    <div className="max-w-[1124px] h-screen mx-auto grid grid-cols-2 items-center gap-[7rem]">
      <main>
         <Image src={logoCopa} alt="Logo da nlw copa"/>
         <h1 className="mt-14 text-white text-5xl font-bold leading-tight">Crie seu próprio bolão da copa e compartilhe entre amigos!</h1>
         <div className="flex items-center mt-10 gap-2 font-bold text-x">
            <Image src={avatares} alt="Usuários que estão usando o NLW copa" quality={100}/>
            <p className="text-gray-100"><span className="text-green-700">+{props.userCount}</span> pessoas já estão usando</p>
         </div>
         <div className="flex flex-col gap-4">
          <form onSubmit={createPool} className="mt-10 flex gap-2">
            <input
              className="flex-1 px-6 py-4 rounded bg-gray-800 border border-gray-600 text-sm text-gray-300" 
              placeholder="Qual nome do seu bolão?" 
              type="text"
              value={poolTitle}
              onChange={(event)=> setPoolTitle(event.target.value)}
              required
            />
            <button
              className="bg-yellow-500 rounded py-4 px-6 text-gray-900 font-bold text-sm uppercase transition-colors hover:bg-yellow-700" 
              type='submit'
            >
              Criar meu bolão
            </button>
          </form>
          <p className="text-gray-500 text-sm leading-relaxed">
            Após criar seu bolão, você receberá um código único que poderá usar para convidar outras pessoas 🚀
          </p>
         </div>
         <div className="flex mt-[2.5rem] pt-10 border-t border-gray-600 divide-x divide-gray-600 justify-between">
          <div className="flex gap-[1.5rem]">
            <Image src={iconCheck} alt="" quality={100}/>
            <div>
              <p className="text-xl text-gray-100 font-bold">+{props.poolCount}</p>
              <p className="text-gray-100">Bolões criados</p>
            </div>       
          </div>
          <div className="flex gap-[1.5rem] pl-[72px]">
          <Image src={iconCheck} alt="" quality={100}/>
            <div>
              <p className="text-xl text-gray-100 font-bold">+{props.guessCount}</p>
              <p className="text-gray-100">Palpites enviados</p>
            </div>
          </div>
         </div>
      </main>
      <Image 
        src={banner} 
        alt="Dois celulares exibindo uma prévia da aplicação do NLW copa"
        quality={100}
      />
    </div>
  )
}

export const getServerSideProps = async ()=>{
  //Promise.all faz que com que todas as api realizem ao mesmo tempo sem uma depender do tempo de espera da outra
  const [poolCountResponse, guessesCountResponse, usersCountResponse] = await Promise.all([
    api('pools/count'),
    api('guesses/count'),
    api('users/count')
  ])
  return {
    props: {
      poolCount: poolCountResponse.data.count,
      guessCount: guessesCountResponse.data.count,
      userCount: usersCountResponse.data.count,
    }
  }
}
