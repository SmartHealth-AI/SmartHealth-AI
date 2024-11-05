const Form = ({ form, children }: any) => <form onSubmit={form.onSubmit}>{children}</form>;

export default Form;
