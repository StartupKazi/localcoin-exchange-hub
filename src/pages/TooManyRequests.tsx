import ErrorPage from "@/components/ErrorPage";

const TooManyRequests = () => <ErrorPage code={429} />;

export default TooManyRequests;