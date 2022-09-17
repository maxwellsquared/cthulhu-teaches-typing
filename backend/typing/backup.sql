--
-- PostgreSQL database dump
--

-- Dumped from database version 10.19 (Ubuntu 10.19-0ubuntu0.18.04.1)
-- Dumped by pg_dump version 10.19 (Ubuntu 10.19-0ubuntu0.18.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: ar_internal_metadata; Type: TABLE; Schema: public; Owner: labber
--

CREATE TABLE public.ar_internal_metadata (
    key character varying NOT NULL,
    value character varying,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL
);


ALTER TABLE public.ar_internal_metadata OWNER TO labber;

--
-- Name: keyboards; Type: TABLE; Schema: public; Owner: labber
--

CREATE TABLE public.keyboards (
    id bigint NOT NULL,
    name character varying,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL,
    user_id bigint,
    keyboard_type character varying,
    color1 character varying,
    color2 character varying
);


ALTER TABLE public.keyboards OWNER TO labber;

--
-- Name: keyboards_id_seq; Type: SEQUENCE; Schema: public; Owner: labber
--

CREATE SEQUENCE public.keyboards_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.keyboards_id_seq OWNER TO labber;

--
-- Name: keyboards_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: labber
--

ALTER SEQUENCE public.keyboards_id_seq OWNED BY public.keyboards.id;


--
-- Name: schema_migrations; Type: TABLE; Schema: public; Owner: labber
--

CREATE TABLE public.schema_migrations (
    version character varying NOT NULL
);


ALTER TABLE public.schema_migrations OWNER TO labber;

--
-- Name: submissions; Type: TABLE; Schema: public; Owner: labber
--

CREATE TABLE public.submissions (
    id bigint NOT NULL,
    wpm integer,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL,
    user_id bigint,
    keyboard_id bigint,
    accuracy integer,
    difficulty character varying,
    guest_name character varying
);


ALTER TABLE public.submissions OWNER TO labber;

--
-- Name: submissions_id_seq; Type: SEQUENCE; Schema: public; Owner: labber
--

CREATE SEQUENCE public.submissions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.submissions_id_seq OWNER TO labber;

--
-- Name: submissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: labber
--

ALTER SEQUENCE public.submissions_id_seq OWNED BY public.submissions.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: labber
--

CREATE TABLE public.users (
    id bigint NOT NULL,
    name character varying,
    email character varying,
    password character varying,
    profile_picture character varying,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL
);


ALTER TABLE public.users OWNER TO labber;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: labber
--

CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO labber;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: labber
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: keyboards id; Type: DEFAULT; Schema: public; Owner: labber
--

ALTER TABLE ONLY public.keyboards ALTER COLUMN id SET DEFAULT nextval('public.keyboards_id_seq'::regclass);


--
-- Name: submissions id; Type: DEFAULT; Schema: public; Owner: labber
--

ALTER TABLE ONLY public.submissions ALTER COLUMN id SET DEFAULT nextval('public.submissions_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: labber
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: ar_internal_metadata; Type: TABLE DATA; Schema: public; Owner: labber
--

COPY public.ar_internal_metadata (key, value, created_at, updated_at) FROM stdin;
environment	development	2022-09-13 20:30:55.524389	2022-09-13 20:30:55.524389
schema_sha1	2961f347cf01ee3e079c18bb844d0540d2d37ebf	2022-09-13 20:30:55.531513	2022-09-13 20:30:55.531513
\.


--
-- Data for Name: keyboards; Type: TABLE DATA; Schema: public; Owner: labber
--

COPY public.keyboards (id, name, created_at, updated_at, user_id, keyboard_type, color1, color2) FROM stdin;
1	GMMK Pro	2022-09-13 20:30:55.809941	2022-09-13 20:30:55.809941	1	75%	#383838	#191919
2	Keychron Q1	2022-09-13 20:30:55.817102	2022-09-13 20:30:55.817102	1	75%	#0e4eb5	#5086de
3	Owlab Mr Suit	2022-09-13 20:30:55.823181	2022-09-13 20:30:55.823181	1	tenkeyless	#124c8a	#b9bbbd
4	QK65	2022-09-13 20:30:55.829018	2022-09-13 20:30:55.829018	2	65%	#989a9c	#c4e5f2
5	Zoom 65	2022-09-13 20:30:55.835146	2022-09-13 20:30:55.835146	2	65%	#e5e8e3	#caccc8
6	GMMK Pro	2022-09-13 20:30:55.841288	2022-09-13 20:30:55.841288	2	75%	#383838	#191919
7	Portico 75	2022-09-13 20:30:55.847162	2022-09-13 20:30:55.847162	2	75%	#9c8b7c	#615e5c
8	Apple Butterfly Keyboard	2022-09-13 20:30:55.853038	2022-09-13 20:30:55.853038	3	laptop	#575757	#141414
9	Mode Sonnet	2022-09-13 20:30:55.858857	2022-09-13 20:30:55.858857	3	75%	#262626	#121212
10	Keycult No. 2/65	2022-09-13 20:30:55.864892	2022-09-13 20:30:55.864892	3	65%	#495c55	#c3a9c9
\.


--
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: public; Owner: labber
--

COPY public.schema_migrations (version) FROM stdin;
20220913185728
20220901230438
20220901230457
20220901231329
20220902175107
20220902175211
20220902175319
20220905194229
20220906173107
20220912201404
20220913174211
\.


--
-- Data for Name: submissions; Type: TABLE DATA; Schema: public; Owner: labber
--

COPY public.submissions (id, wpm, created_at, updated_at, user_id, keyboard_id, accuracy, difficulty, guest_name) FROM stdin;
1	25	2022-09-13 20:30:55.876824	2022-09-13 20:30:55.876824	1	1	88	standard	\N
2	32	2022-09-13 20:30:55.883159	2022-09-13 20:30:55.883159	1	2	95	standard	\N
3	56	2022-09-13 20:30:55.889113	2022-09-13 20:30:55.889113	1	3	90	standard	\N
4	43	2022-09-13 20:30:55.895086	2022-09-13 20:30:55.895086	1	1	75	standard	\N
5	25	2022-09-13 20:30:55.901063	2022-09-13 20:30:55.901063	1	2	88	standard	\N
6	39	2022-09-13 20:30:55.907092	2022-09-13 20:30:55.907092	1	3	95	standard	\N
7	58	2022-09-13 20:30:55.913284	2022-09-13 20:30:55.913284	1	1	90	standard	\N
8	62	2022-09-13 20:30:55.919238	2022-09-13 20:30:55.919238	1	2	75	standard	\N
9	51	2022-09-13 20:30:55.925227	2022-09-13 20:30:55.925227	1	3	88	standard	\N
10	54	2022-09-13 20:30:55.931132	2022-09-13 20:30:55.931132	1	1	95	standard	\N
11	36	2022-09-13 20:30:55.937225	2022-09-13 20:30:55.937225	1	2	90	standard	\N
12	43	2022-09-13 20:30:55.943322	2022-09-13 20:30:55.943322	1	3	75	standard	\N
13	55	2022-09-13 20:30:55.949299	2022-09-13 20:30:55.949299	1	2	99	standard	\N
14	25	2022-09-13 20:30:55.955707	2022-09-13 20:30:55.955707	1	2	100	standard	\N
15	32	2022-09-13 20:30:55.961824	2022-09-13 20:30:55.961824	1	2	92	standard	\N
16	56	2022-09-13 20:30:55.967924	2022-09-13 20:30:55.967924	1	3	88	standard	\N
17	43	2022-09-13 20:30:55.973997	2022-09-13 20:30:55.973997	1	3	65	standard	\N
18	56	2022-09-13 20:30:55.980162	2022-09-13 20:30:55.980162	1	3	88	standard	\N
19	43	2022-09-13 20:30:55.986211	2022-09-13 20:30:55.986211	1	3	65	standard	\N
20	55	2022-09-13 20:30:55.992235	2022-09-13 20:30:55.992235	1	2	97	standard	\N
21	15	2022-09-13 20:30:55.998301	2022-09-13 20:30:55.998301	2	4	100	standard	\N
22	45	2022-09-13 20:30:56.00428	2022-09-13 20:30:56.00428	2	4	87	standard	\N
23	61	2022-09-13 20:30:56.010329	2022-09-13 20:30:56.010329	2	4	99	standard	\N
24	52	2022-09-13 20:30:56.016459	2022-09-13 20:30:56.016459	2	4	90	standard	\N
25	38	2022-09-13 20:30:56.022402	2022-09-13 20:30:56.022402	2	5	100	standard	\N
26	15	2022-09-13 20:30:56.028414	2022-09-13 20:30:56.028414	2	5	100	standard	\N
27	45	2022-09-13 20:30:56.034518	2022-09-13 20:30:56.034518	2	5	76	standard	\N
28	38	2022-09-13 20:30:56.040909	2022-09-13 20:30:56.040909	2	5	100	standard	\N
29	15	2022-09-13 20:30:56.047137	2022-09-13 20:30:56.047137	2	5	100	standard	\N
30	45	2022-09-13 20:30:56.053137	2022-09-13 20:30:56.053137	2	5	76	standard	\N
31	49	2022-09-13 20:30:56.059048	2022-09-13 20:30:56.059048	2	6	98	standard	\N
32	52	2022-09-13 20:30:56.065208	2022-09-13 20:30:56.065208	2	6	89	standard	\N
33	58	2022-09-13 20:30:56.071596	2022-09-13 20:30:56.071596	2	6	98	standard	\N
34	32	2022-09-13 20:30:56.077551	2022-09-13 20:30:56.077551	2	6	89	standard	\N
35	41	2022-09-13 20:30:56.084547	2022-09-13 20:30:56.084547	2	7	100	standard	\N
36	50	2022-09-13 20:30:56.091166	2022-09-13 20:30:56.091166	2	7	99	standard	\N
37	38	2022-09-13 20:30:56.097705	2022-09-13 20:30:56.097705	2	7	100	standard	\N
38	40	2022-09-13 20:30:56.104146	2022-09-13 20:30:56.104146	2	7	99	standard	\N
39	52	2022-09-13 20:30:56.110464	2022-09-13 20:30:56.110464	2	4	90	standard	\N
40	38	2022-09-13 20:30:56.116698	2022-09-13 20:30:56.116698	2	4	100	standard	\N
41	15	2022-09-13 20:30:56.123015	2022-09-13 20:30:56.123015	2	4	100	standard	\N
42	45	2022-09-13 20:30:56.129187	2022-09-13 20:30:56.129187	2	4	76	standard	\N
43	60	2022-09-13 20:30:56.135514	2022-09-13 20:30:56.135514	2	4	98	standard	\N
44	52	2022-09-13 20:30:56.141766	2022-09-13 20:30:56.141766	2	4	89	standard	\N
45	38	2022-09-13 20:30:56.147788	2022-09-13 20:30:56.147788	2	4	100	standard	\N
46	59	2022-09-13 20:30:56.154046	2022-09-13 20:30:56.154046	3	1	82	standard	\N
47	50	2022-09-13 20:30:56.160037	2022-09-13 20:30:56.160037	3	8	76	standard	\N
48	34	2022-09-13 20:30:56.166378	2022-09-13 20:30:56.166378	3	8	100	standard	\N
49	50	2022-09-13 20:30:56.172509	2022-09-13 20:30:56.172509	3	8	76	standard	\N
50	34	2022-09-13 20:30:56.178606	2022-09-13 20:30:56.178606	3	8	100	standard	\N
51	50	2022-09-13 20:30:56.184765	2022-09-13 20:30:56.184765	3	8	76	standard	\N
52	34	2022-09-13 20:30:56.19086	2022-09-13 20:30:56.19086	3	8	100	standard	\N
53	57	2022-09-13 20:30:56.196958	2022-09-13 20:30:56.196958	3	9	98	standard	\N
54	43	2022-09-13 20:30:56.203345	2022-09-13 20:30:56.203345	3	9	92	standard	\N
55	49	2022-09-13 20:30:56.209434	2022-09-13 20:30:56.209434	3	9	94	standard	\N
56	32	2022-09-13 20:30:56.215585	2022-09-13 20:30:56.215585	3	9	82	standard	\N
57	57	2022-09-13 20:30:56.221836	2022-09-13 20:30:56.221836	3	9	98	standard	\N
58	43	2022-09-13 20:30:56.227884	2022-09-13 20:30:56.227884	3	9	92	standard	\N
59	49	2022-09-13 20:30:56.237798	2022-09-13 20:30:56.237798	3	9	94	standard	\N
60	53	2022-09-13 20:30:56.244099	2022-09-13 20:30:56.244099	3	9	82	standard	\N
61	50	2022-09-13 20:30:56.250409	2022-09-13 20:30:56.250409	3	10	76	standard	\N
62	65	2022-09-13 20:30:56.256721	2022-09-13 20:30:56.256721	3	10	96	standard	\N
63	50	2022-09-13 20:30:56.262922	2022-09-13 20:30:56.262922	3	10	76	standard	\N
64	57	2022-09-13 20:30:56.269529	2022-09-13 20:30:56.269529	3	10	96	standard	\N
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: labber
--

COPY public.users (id, name, email, password, profile_picture, created_at, updated_at) FROM stdin;
1	Adam Harvey	adamgrharvey@gmail.com	test	\N	2022-09-13 20:30:55.773306	2022-09-13 20:30:55.773306
2	Curtis Warcup	curtis.gwarcup@gmail.com	test	\N	2022-09-13 20:30:55.779885	2022-09-13 20:30:55.779885
3	Max Kuhn	maxkuhn@gmail.com	test	\N	2022-09-13 20:30:55.786292	2022-09-13 20:30:55.786292
4	Guest	guest@guest.guest	guest	\N	2022-09-13 20:30:55.792419	2022-09-13 20:30:55.792419
\.


--
-- Name: keyboards_id_seq; Type: SEQUENCE SET; Schema: public; Owner: labber
--

SELECT pg_catalog.setval('public.keyboards_id_seq', 10, true);


--
-- Name: submissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: labber
--

SELECT pg_catalog.setval('public.submissions_id_seq', 64, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: labber
--

SELECT pg_catalog.setval('public.users_id_seq', 4, true);


--
-- Name: ar_internal_metadata ar_internal_metadata_pkey; Type: CONSTRAINT; Schema: public; Owner: labber
--

ALTER TABLE ONLY public.ar_internal_metadata
    ADD CONSTRAINT ar_internal_metadata_pkey PRIMARY KEY (key);


--
-- Name: keyboards keyboards_pkey; Type: CONSTRAINT; Schema: public; Owner: labber
--

ALTER TABLE ONLY public.keyboards
    ADD CONSTRAINT keyboards_pkey PRIMARY KEY (id);


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: labber
--

ALTER TABLE ONLY public.schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- Name: submissions submissions_pkey; Type: CONSTRAINT; Schema: public; Owner: labber
--

ALTER TABLE ONLY public.submissions
    ADD CONSTRAINT submissions_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: labber
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: index_keyboards_on_user_id; Type: INDEX; Schema: public; Owner: labber
--

CREATE INDEX index_keyboards_on_user_id ON public.keyboards USING btree (user_id);


--
-- Name: index_submissions_on_keyboard_id; Type: INDEX; Schema: public; Owner: labber
--

CREATE INDEX index_submissions_on_keyboard_id ON public.submissions USING btree (keyboard_id);


--
-- Name: index_submissions_on_user_id; Type: INDEX; Schema: public; Owner: labber
--

CREATE INDEX index_submissions_on_user_id ON public.submissions USING btree (user_id);


--
-- Name: submissions fk_rails_898a8a2f11; Type: FK CONSTRAINT; Schema: public; Owner: labber
--

ALTER TABLE ONLY public.submissions
    ADD CONSTRAINT fk_rails_898a8a2f11 FOREIGN KEY (keyboard_id) REFERENCES public.keyboards(id);


--
-- Name: submissions fk_rails_8d85741475; Type: FK CONSTRAINT; Schema: public; Owner: labber
--

ALTER TABLE ONLY public.submissions
    ADD CONSTRAINT fk_rails_8d85741475 FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: keyboards fk_rails_b88c2c7c24; Type: FK CONSTRAINT; Schema: public; Owner: labber
--

ALTER TABLE ONLY public.keyboards
    ADD CONSTRAINT fk_rails_b88c2c7c24 FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

