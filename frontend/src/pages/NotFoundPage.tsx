import BorderAnimatedContainer from "../components/BorderAnimatedContainer";

const NotFoundPage = () => {
  return (
    <div className="relative w-3xl max-w-6xl h-100 rounded-2xl overflow-hidden">
      <BorderAnimatedContainer >
        <div className="flex flex-col w-full items-center justify-center h-full">
          <h3 className="text-4xl text-center">Упс... </h3>
          <h4 className="text-4xl  text-center">Ошибка 404</h4>
          <h4 className="text-4xl text-center">Мы не нашли такую страницу </h4>
        </div>
      </BorderAnimatedContainer>
    </div>
    
  );
};

export default NotFoundPage;