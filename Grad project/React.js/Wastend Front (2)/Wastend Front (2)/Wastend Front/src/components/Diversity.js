import React from "react";
import "./styles/diversity.css";
import { Link } from "react-router-dom";
function Diversity() {
  return (
    <>
      <div className="diversity">
        <div className="container">
          <div className="heading">
            <h3>Everyone deserves a seat at the table</h3>
            <p>
              Across borders, dialects and differences, there’s a universal
              language: food. It’s one of the reasons we here at Wastend value
              it so much.
            </p>
          </div>
          <div className="body">
            <p>
              We turn to food in times of triumph and need, through sickness and
              health, during the everyday and the exceptional. Food has always
              brought us together and broken down barriers. It’s a universal
              language that connects us with those who may not share the same
              traditions, trials, or tongue. Wastend is a social impact company
              with a mission to inspire and empower people to save food. We are
              a leader in this field, and, as a leader, we want to be role
              models in every way. <br /> <br /> <br />
              Wastend is a business that does good, and we want to make people
              feel good about saving food. To achieve this positive change, we
              have to make sure that we have the right people with a range of
              backgrounds, experience, thinking and talents to help us in the
              fight against food waste. We believe everyone deserves a seat at
              the table. We know there’s more work to be done, and for us, that
              starts internally.
              <br /> <br /> <br />
              That’s we’re striving to create more diverse teams where all our
              employees feel represented, included and safe. A place where
              people can tap into the power of their authenticity and be
              respected and valued for it. The aim? To become a benchmark
              organisation for how diversity, equity and inclusion are
              incorporated into our everyday working lives.
            </p>
            <br /> <br /> <br />
            <p>
              <h5>SO WHAT DO YOU MEAN WITH DE&I?</h5> <br />
              <span style={{ fontWeight: "bold" }}>Diversity</span> is valuing
              different perspectives and intentionally designing our team to
              reflect a range of backgrounds. This representation can be through
              many dimensions, including gender identity, age, race and
              ethnicity, sexual orientation and ability. <br />
              <br />
              <span style={{ fontWeight: "bold" }}>Equity</span> is creating
              consistent, systematic, fair and just treatment, access,
              opportunity, and advancement for all individuals while working to
              remove any barriers that might prevent someone’s full and
              equitable participation at Wastend.
              <br />
              <br />
              <span style={{ fontWeight: "bold" }}>Inclusion</span> is ensuring
              that everyone feels like they belong and have a voice that is
              heard. <br /> <br />
              <h5>AND HOW WILL ACHIEVE IT?</h5>
              We’ve identified four key drivers to ensure that DE&I comes to
              life in our everyday culture and way of working at Wastend. Below
              is an update on how we did against our goals in 2022 and what
              we’ve set out to achieve in 2023.
            </p>
            <br />
            <br />
            <p>
              <h5>AWARENESS</h5>
              We will ensure that everyone at Wastend - across all levels of the
              organisation - understands why diversity, equity and inclusion are
              so important to how we work. This way, we can embed it positively
              at every touchpoint across the business. To do this, we are
              building resources for employees to increase their understanding:
              from sharing personal stories and knowledge to providing
              information on how to be an ally. We will:
              <br />
              <br />
              <ul>
                <li className="noStyle">
                  Ensure employees feel more included - in 2023, we again aim to
                  improve our employee inclusion score to more than 72%.
                </li>
                <li className="noStyle">
                  Hear more employees' views - we will work towards matching or
                  improving on the participation in our most recent DEI survey,
                  aiming for 62% or more of employees to contribute to our
                  Global DEI survey.
                </li>
                <li className="noStyle">
                  We will give under-represented groups a space to talk and
                  celebrate. In 2022, we launched 4 employee resource groups
                  (ERGs): Women in Leadership
                </li>
              </ul>
            </p>
            <br />
            <br />
            <p>
              <h5>REPRESENTATION</h5>
              <br />
              At every level of the business, our organisation should reflect
              the world we live and work in. To do this, we will ensure we
              attract, retain and support diverse talent and suppliers by
              removing hiring biases, creating equitable and fair application
              processes, and actively seeking candidates and suppliers with
              diverse backgrounds.
              <br />
              We will ensure:
              <ul>
                <li className="noStyle">
                  All job descriptions use inclusive and equitable language - in
                  2022, we implemented this and started advertising at least 20%
                  of roles in channels which focus on key audiences. We will
                  continue this in 2023 and revamp our Careers page.
                </li>
                <li className="noStyle">
                  Hiring managers will reduce bias and encourage diversity in
                  our workplace - we will train 100% of hiring managers to embed
                  a fair and equitable process when recruiting.
                </li>
                <li className="noStyle">
                  More applicants from under-represented communities will be
                  attracted to work at Too Good To Go - we will launch two new
                  talent marketing campaigns with a DEI focus, implement three
                  apprenticeship programmes for minority group populations and
                  complete three hiring events with high minority population
                  schools or universities.
                </li>
                <li className="noStyle">
                  All our employees will see what roles are available for their
                  next step at Too Good To Go - 100% of internal roles will be
                  published for all employees to see.
                </li>
                <li className="noStyle">
                  All our spaces are accessible - we did an audit of this last
                  year, and this year we will implement plans to improve
                  accessibility in 100% of our spaces.
                </li>
              </ul>
            </p>
            <br /> <br />
            <p>
              <h5>EDUCATION</h5>
              Education is key to broadening the awareness and perspectives of
              every person who works at Too Good To Go. Our educational pillar
              will help us educate our people on how to make diversity, equity
              and inclusion an everyday reality. To do this, we will create
              opportunities for education, new experiences and greater exposure
              to DE&I.
            </p>
          </div>
        </div>
      </div>
      <div className="findJob">
        <div className="container">
          <div className="heading">
            <h3>FIND YOUR DREAM JOB AT Wastend</h3>
            <p>Explore careers at Wastend.</p>
          </div>
          <Link className="main-button" to={"/carrers/opportunities"}>
            See Open Positions
          </Link>
        </div>
      </div>
      <div className="divider"></div>
    </>
  );
}

export default Diversity;
