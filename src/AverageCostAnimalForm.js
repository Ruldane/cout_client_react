import React, {useEffect} from 'react';
import {
    Button,
    Grid,
    makeStyles,
    Paper,
    Table, TableBody, TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField
} from "@material-ui/core";
import axios from "axios";

const AverageCostAnimalForm = () => {

    const axios_ = axios.create({
        baseURL: 'http://localhost:5000',
        headers: { 'Content-Type': 'application/json' },
    })

    const animals = [
        {
            value: '',
            label: '',
        },
        {
            value: 'chat',
            label: 'Chat',
        },
        {
            value: 'chien',
            label: 'Chien',
        },
    ];

    const ageAnimals = [
        {
            value: '',
            label: '',
        },
        {
            value: 'junior_et_chiot',
            label: 'junior et chiot',
        },
        {
            value: 'adulte',
            label: 'Adulte',
        },
        {
            value: 'senior',
            label: 'Sénior',
        },
    ];

    const sizeAnimals = [
        {
            value: '',
            label: '',
        },
        {
            value: 'xsmall',
            label: 'Très petit: 4kg max',
        },
        {
            value: 'mini',
            label: 'Petit: 5kg à 10kg',
        },
        {
            value: 'medium',
            label: 'Moyen: 11 à 25kg',
        },
        {
            value: 'maxi',
            label: 'Grand: 26 à 44kg',
        },
        {
            value: 'geant',
            label: 'Très grand: 45 et plus',
        },
    ];

    const sterilisedAnimals = [
        {
            value: '',
            label: '',
        },
        {
            value: false,
            label: 'Non stérilisée ou non castré',
        },
        {
            value: true,
            label: 'Stérilisée ou castré',
        },
    ];

    const useStyles = makeStyles((theme) => ({
        root: {
            '& .MuiTextField-root': {
                margin: theme.spacing(1),
                width: '25ch',
            },

        },
        table: {
            minWidth: 650,
        },
        petTitle: {
            fontWeight: 'bold',
            fontSize: '26px',
            fontFamily: 'Inter, sans-serif',
            marginTop: '50px',
            marginBottom: '50px',
            textAlign: 'center',
        },
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
        button : {
            textAlign: 'center',
        }
    }));

    const classes = useStyles();
    const [animal, setAnimal] = React.useState('');
    const [name, setName] = React.useState('')
    const [age, setAge] = React.useState('');
    const [sterilise, setSterilise] = React.useState(null);
    const [size, setSize] = React.useState('');
    const [displayAverage, setDisplayAverage] = React.useState(false);
    const [average, setAverage] = React.useState({});
    const [showTable, setShowTable] = React.useState(false);

    const handleChange = (event) => {
        setAnimal(event.target.value);
    };

    const handleChangeAge = (event) => {
        setAge(event.target.value);
    };

    const handleChangeName = (event) => {
        setName(event.target.value);
    };

    const handleChangeSterilised = (event) => {
        setSterilise(event.target.value);
    };

    const handleChangeSizeAnimals = (event) => {
        setSize(event.target.value);
    };

    const getData = async () => {
        console.log(average)
        console.log(average['foods'].toFixed(2))
        console.log(average.foods.toFixed(2))
    }

    function handleSubmit(e) {
        e.preventDefault();
        const data = { animal: animal, size: size, age: age, sterilise: sterilise };
        fetch('http://127.0.0.1:5000/api/query', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(data),
        }) .then((res) => {
            // JSON response is handled by a json() promises
            return res.json()
                .then( (data) => data? setAverage(data) : console.log(`data not available`))
        });
    }

    return (
        <form className={classes.root} noValidate autoComplete="off"  onSubmit={handleSubmit}>
            <div>
                <div className={classes.petTitle}> Calculez le coût moyen mensuel de votre animal</div>
                <Grid
                    container
                    spacing={3}
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Grid item xs={6}>
                        <Paper className={classes.paper} elevation={0}>
                            <TextField
                                id="outlined-select-currency-native"
                                select
                                label="Votre animal"
                                value={animal}
                                onChange={handleChange}
                                SelectProps={{
                                    native: true,
                                }}
                                helperText="Avez-vous un chat ou un chien?"
                                variant="outlined"
                            >
                                {animals.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </TextField>
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className={classes.paper} elevation={0}>
                            <TextField
                                required
                                id="standard-required"
                                label="Nom de votre animal"
                                defaultValue=""
                                onChange={handleChangeName}
                            />
                        </Paper>
                    </Grid>
                    {animal &&
                    <>
                        <Grid item xs={4}>
                            <Paper className={classes.paper} elevation={0}>
                                <TextField
                                    id="outlined-select-currency-native"
                                    select
                                    label={`Âge de votre ${animal}`}
                                    value={age}
                                    onChange={handleChangeAge}
                                    SelectProps={{
                                        native: true,
                                    }}
                                    helperText={`Quel âge a votre ${animal}?`}
                                    variant="outlined"
                                >
                                    {ageAnimals.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </TextField>
                            </Paper>
                        </Grid>
                        <Grid item xs={4}>
                            <Paper className={classes.paper} elevation={0}>
                                <TextField
                                    id="outlined-select-currency-native"
                                    select
                                    label={`${animal} stérilisé ou castré`}
                                    value={sterilise}
                                    onChange={handleChangeSterilised}
                                    SelectProps={{
                                        native: true,
                                    }}
                                    helperText={`Votre ${animal} est-il stérilisé ou castré?`}
                                    variant="outlined"
                                >
                                    {sterilisedAnimals.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </TextField>
                            </Paper>
                        </Grid>
                        <Grid item xs={4}>
                            <Paper className={classes.paper} elevation={0}>
                                <TextField
                                    id="outlined-select-currency-native"
                                    select
                                    label={`Taille de votre ${animal}`}
                                    value={size}
                                    onChange={handleChangeSizeAnimals}
                                    SelectProps={{
                                        native: true,
                                    }}
                                    helperText={`Votre ${animal} est-il stérilisé ou castré?`}
                                    variant="outlined"
                                >
                                    {sizeAnimals.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </TextField>
                            </Paper>
                        </Grid>
                    </>
                    }
                </Grid>
                {animal && age && sterilise && size &&
                <Paper className={classes.paper} elevation={0}>
                    <Button
                        type="submit"
                        variant="contained"
                        className={classes.button}
                        color="primary">
                        Calculer le coût de votre animal!
                    </Button>
                </Paper>
                }
                {average && average.foods &&
                <>
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>{animal}</TableCell>
                                    <TableCell align="right">Nourriture</TableCell>
                                    <TableCell align="right">Jouets</TableCell>
                                    <TableCell align="right">Soins et vermifuge</TableCell>
                                    <TableCell align="right">Laisse et colliers</TableCell>
                                    <TableCell align="right">Prix total</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableCell>
                                    {name ? name: animal}
                                </TableCell>
                                <TableCell>
                                    {`${average.foods.toFixed(2)} euros`}
                                </TableCell>
                                <TableCell>
                                    {`${average.averageCostToy.toFixed(2)} euros`}
                                </TableCell>
                                <TableCell>
                                    {`${average.healthCostDog.toFixed(2)} euros`}
                                </TableCell>
                                <TableCell>
                                    {`${(average.averageCostLeashCollar ).toFixed(2)} euros`}
                                </TableCell>
                                <TableCell>
                                    {`${(average.foods + average.averageCostToy + average.averageCostLeashCollar + average.healthCostDog ).toFixed(2)} euros`}
                                </TableCell>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </>
                }
            </div>
        </form>
    )
}

export default AverageCostAnimalForm;