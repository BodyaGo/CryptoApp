import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-center text-white">
      <div className="container p-4">

        <section className="">
          <form action="">
            <div className="row d-flex justify-content-center">
              <div className="col-auto">
                <p className="pt-2">
                  <strong>Sign up for our newsletter</strong>
                </p>
              </div>

              <div className="col-md-5 col-12">
                <div className="form-outline form-white mb-4">
                  <input type="email" id="form5Example2" className="form-control" placeholder="Email address" />
                </div>
              </div>

              <div className="col-auto">
                <button type="submit" className="btn btn-outline-light mb-4">
                  Subscribe
                </button>
              </div>
            </div>
          </form>
        </section>

        <section className="mb-4">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt distinctio earum repellat quaerat voluptatibus
            placeat nam, commodi optio pariatur est quia magnam eum harum corrupti dicta, aliquam sequi voluptate
            quibusdam!
          </p>
        </section>
      </div>

      <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        © 2023 Crypto App:
        <a className="text-white" href="https://mdbootstrap.com/">
          @CryptoApp
        </a>
      </div>
    </footer>
  );
};

export default Footer;
